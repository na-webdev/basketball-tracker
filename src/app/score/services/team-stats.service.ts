import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_CONSTANTS } from '../constants';
import { GameI, GameResult, UrlConstantsI } from '../interfaces';
import { TeamI } from '../interfaces';
import { BehaviorSubject, finalize, map, take, tap } from 'rxjs';
import { NbaApiResponseI } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TeamStatsService {
  private teamsSubject = new BehaviorSubject<TeamI[]>([]);
  teams$ = this.teamsSubject.asObservable();

  private gamesSubject = new BehaviorSubject<{ [property: string]: GameI[] }>(
    {}
  );
  games$ = this.gamesSubject.asObservable();

  private trackedTeamsSubject = new BehaviorSubject<TeamI[]>([]);
  trackedTeams$ = this.trackedTeamsSubject.asObservable();

  private readonly NBA_API: string;
  private requestSent: boolean;

  constructor(
    private http: HttpClient,
    @Inject(URL_CONSTANTS) private API_URLS: UrlConstantsI
  ) {
    this.NBA_API = this.API_URLS.NBA_API;
    this.requestSent = false;
  }

  getAllNBATeams() {
    this.http
      .get<NbaApiResponseI<TeamI[]>>(`${this.NBA_API}/teams`)
      .pipe(
        take(1),
        tap((res) => {
          this.teamsSubject.next(res.data);
        })
      )
      .subscribe();
  }

  getTeamResultsByPeriod(teamId: number, periodInDays: number) {
    const query = this.createGameResultsQuery(teamId, periodInDays);
    const team = this.trackedTeamsSubject.value.find(
      (team) => team.id === teamId
    );

    if (!team && !this.requestSent) {
      this.requestSent = true;
      this.http
        .get<NbaApiResponseI<GameI[]>>(`${this.NBA_API}/games?${query}`)
        .pipe(
          take(1),
          tap((res) => this.registerGameResultsToTeam(teamId, res.data)),
          finalize(() => (this.requestSent = false))
        )
        .subscribe();
    }
  }
  getTeamResultsAsObs(teamId: number, periodInDays: number) {
    const query = this.createGameResultsQuery(teamId, periodInDays);

    return this.http
      .get<NbaApiResponseI<GameI[]>>(`${this.NBA_API}/games?${query}`)
      .pipe(
        take(1),
        map((res) => res.data)
      );
  }

  registerGameResultsToTeam(teamId: number, playedGames: GameI[]) {
    let games = this.gamesSubject.value;
    games = {
      ...games,
      [teamId]: [...playedGames],
    };
    this.gamesSubject.next(games);

    const teams = this.teamsSubject.value;
    const trackedTeams = this.trackedTeamsSubject.value;

    const team = teams.find((team) => team.id === teamId);

    const ptsScored: number[] = [];
    const ptsConceded: number[] = [];

    if (team) {
      const gameResults: GameResult[] = [];

      playedGames.forEach((game) => {
        if (team.id == game.home_team.id) {
          ptsScored.push(game.home_team_score);
          ptsConceded.push(game.visitor_team_score);

          gameResults.push(this.generateGameResult(team.id, game));
        } else if (team.id == game.visitor_team.id) {
          ptsScored.push(game.visitor_team_score);
          ptsConceded.push(game.home_team_score);

          gameResults.push(this.generateGameResult(team.id, game));
        }
      });

      team.lastGamesResults = gameResults;

      team.avgPtsScored = this.calculateAvgPts(ptsScored);
      team.avgPtsConceded = this.calculateAvgPts(ptsConceded);

      this.trackedTeamsSubject.next([...trackedTeams, { ...team }]);
    }
  }

  createGameResultsQuery(teamId: number, days: number) {
    let query = `page=0&team_ids[]=${teamId}`;

    const now = new Date();
    for (let i = 0; i < days; i++) {
      now.setDate(now.getDate() - 1);
      const date = now.toISOString().split('T')[0];
      query += '&dates[]=' + date;
    }

    return query;
  }

  removeTrackedTeam(id: number) {
    const teams = this.trackedTeamsSubject.value.filter(
      (team) => team.id !== id
    );
    const games = this.gamesSubject.value;
    delete games[id];

    this.trackedTeamsSubject.next(teams);
    this.gamesSubject.next(games);
  }

  generateGameResult(teamId: number, game: GameI): GameResult {
    if (teamId === game.home_team.id) {
      if (game.home_team_score > game.visitor_team_score) return 'W';
      else if (game.home_team_score < game.visitor_team_score) return 'L';
    } else if (teamId === game.visitor_team.id) {
      if (game.home_team_score < game.visitor_team_score) return 'W';
      else if (game.home_team_score > game.visitor_team_score) return 'L';
    }
    return 'D';
  }

  calculateAvgPts(points: number[]) {
    const sum = points.reduce((sum, point) => sum + point, 0);
    return Math.round(sum / points.length);
  }
}

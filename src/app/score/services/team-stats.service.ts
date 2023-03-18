import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_CONSTANTS } from '../constants';
import { GameI, UrlConstantsI } from '../interfaces';
import { TeamI } from '../interfaces';
import { BehaviorSubject, map, take, tap } from 'rxjs';
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
  trackedTeams$ = this.trackedTeamsSubject
    .asObservable()
    .pipe(map((teamMap) => Object.values(teamMap)));
  private readonly NBA_API: string;
  constructor(
    private http: HttpClient,
    @Inject(URL_CONSTANTS) private API_URLS: UrlConstantsI
  ) {
    this.NBA_API = this.API_URLS.NBA_API;
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

    if (!team)
      this.http
        .get<NbaApiResponseI<GameI[]>>(`${this.NBA_API}/games?${query}`)
        .pipe(
          take(1),
          tap((res) => {
            let games = this.gamesSubject.value;
            games = {
              ...games,
              [teamId]: [...res.data],
            };

            const teams = this.teamsSubject.value;
            const trackedTeams = this.trackedTeamsSubject.value;

            const team = teams.find((team) => team.id === teamId);

            const ptsScored: number[] = [];
            const ptsConceded: number[] = [];

            if (team) {
              team.last_games = [];
              res.data.forEach((game) => {
                if (team.id == game.home_team.id) {
                  ptsScored.push(game.home_team_score);
                  ptsConceded.push(game.visitor_team_score);

                  if (game.home_team_score > game.visitor_team_score)
                    team.last_games?.push('W');
                  else if (game.home_team_score < game.visitor_team_score)
                    team.last_games?.push('L');
                  else team.last_games?.push('D');
                } else if (team.id == game.visitor_team.id) {
                  ptsScored.push(game.visitor_team_score);
                  ptsConceded.push(game.home_team_score);
                  if (game.home_team_score < game.visitor_team_score)
                    team.last_games?.push('W');
                  else if (game.home_team_score > game.visitor_team_score)
                    team.last_games?.push('L');
                  else team.last_games?.push('D');
                }
              });

              team.avgPtsScored = Math.round(
                ptsScored.reduce((sum, val) => sum + val, 0) / ptsScored.length
              );
              team.avgPtsConceded = Math.round(
                ptsConceded.reduce((sum, val) => sum + val, 0) /
                  ptsConceded.length
              );

              this.trackedTeamsSubject.next([...trackedTeams, team]);

              this.gamesSubject.next(games);
            }
          })
        )
        .subscribe();
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
}

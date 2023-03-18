import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { TeamStatsService } from '../services';
import { GameI } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LatestGameResultsResolver implements Resolve<GameI[]> {
  constructor(private teamStatsService: TeamStatsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GameI[]> {
    const teamId = route.paramMap.get('teamId') || '';
    console.log(teamId);
    return this.teamStatsService.games$.pipe(
      map((gameMap) => gameMap[teamId]),
      switchMap((games) => {
        console.log(games);
        if (games && games.length) return of(games);
        console.log(games);
        return this.teamStatsService.getTeamGameResultsAsObs(+teamId, 12);
      })
    );
  }
}

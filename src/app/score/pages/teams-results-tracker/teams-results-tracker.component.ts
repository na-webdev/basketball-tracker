import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeamI } from '../../interfaces';
import { TeamStatsService } from '../../services';
import { GAME_RESULTS_PERIOD } from '../../constants';

@Component({
  selector: 'score-teams-results-tracker',
  templateUrl: './teams-results-tracker.component.html',
  styleUrls: ['./teams-results-tracker.component.scss'],
})
export class TeamsResultsTrackerComponent implements OnInit {
  teams$: Observable<TeamI[]> = of([]);
  trackedTeams$: Observable<TeamI[]> = of([]);

  constructor(private teamStatsService: TeamStatsService) {}

  ngOnInit() {
    this.teams$ = this.teamStatsService.teams$;
    this.trackedTeams$ = this.teamStatsService.trackedTeams$;
  }

  trackTeam(id: number) {
    this.teamStatsService.getTeamResultsByPeriod(id, GAME_RESULTS_PERIOD);
  }

  handleRemoveTrackedTeam(id: number) {
    this.teamStatsService.removeTrackedTeam(id);
  }
}

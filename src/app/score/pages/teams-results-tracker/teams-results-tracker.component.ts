import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeamI } from '../../interfaces';
import { TeamStatsService } from '../../services';

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
    this.teamStatsService.getTeamResultsByPeriod(id, 12);
  }

  handleRemoveTrackedTeam(id: number) {
    this.teamStatsService.removeTrackedTeam(id);
  }
}

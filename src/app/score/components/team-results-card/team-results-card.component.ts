import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamI } from '../../interfaces';
import { GAME_RESULTS_PERIOD } from '../../constants';

@Component({
  selector: 'score-team-results-card',
  templateUrl: './team-results-card.component.html',
  styleUrls: ['./team-results-card.component.scss'],
})
export class TeamResultsCardComponent {
  @Input() team?: TeamI;
  @Output() removeTeam = new EventEmitter<number>();
  gameResultsPeriod = GAME_RESULTS_PERIOD;

  removeCard(teamId: number) {
    this.removeTeam.emit(teamId);
  }
}

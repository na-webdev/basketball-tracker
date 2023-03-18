import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamI } from '../../interfaces';

@Component({
  selector: 'score-results-card-list',
  templateUrl: './results-card-list.component.html',
  styleUrls: ['./results-card-list.component.scss'],
})
export class ResultsCardListComponent {
  @Input() teams: TeamI[];
  @Output() removeTrackedTeam = new EventEmitter<number>();

  constructor() {
    this.teams = [];
  }

  handleRemoveTeam(id: number) {
    this.removeTrackedTeam.emit(id);
  }
}

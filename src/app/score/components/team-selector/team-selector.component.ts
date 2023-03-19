import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamI } from '../../interfaces';

@Component({
  selector: 'score-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss'],
})
export class TeamSelectorComponent {
  @Input() teams: TeamI[] = [];
  @Output() selectTeam = new EventEmitter<number>();

  selectNewTeam(teamId: string) {
    this.selectTeam.emit(+teamId);
  }
}

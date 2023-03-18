import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamI } from '../../interfaces';

@Component({
  selector: 'score-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss'],
})
export class TeamSelectorComponent {
  @Input() teams: TeamI[];
  @Output() selectTeam = new EventEmitter<number>();

  constructor() {
    this.teams = [
      {
        name: 'hello',
        city: '',
        abbreviation: '',
        conference: '',
        division: '',
        id: 2,
        full_name: 'shoo',
      },
    ];
  }

  selectNewTeam(teamId: string) {
    console.log(teamId);
    this.selectTeam.emit(+teamId);
  }
}

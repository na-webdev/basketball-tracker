import { Component, Input, OnInit } from '@angular/core';
import { GameResult } from '../../interfaces';

@Component({
  selector: 'score-game-result-badge',
  templateUrl: './game-result-badge.component.html',
  styleUrls: ['./game-result-badge.component.scss'],
})
export class GameResultBadgeComponent implements OnInit {
  @Input() gameResult: GameResult;
  resultClass: string;

  constructor() {
    this.gameResult = 'D';
    this.resultClass = 'bg-dark';
  }

  ngOnInit() {
    switch (this.gameResult) {
      case 'W':
        this.resultClass = 'bg-success';
        break;
      case 'L':
        this.resultClass = 'bg-danger';
        break;
      default:
        this.resultClass = 'bg-dark';
    }
  }
}

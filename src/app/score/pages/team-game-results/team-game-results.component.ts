import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { GameI, TeamI } from '../../interfaces';
import { GAME_RESULTS_PERIOD } from '../../constants';

@Component({
  selector: 'score-team-game-results',
  templateUrl: './team-game-results.component.html',
  styleUrls: ['./team-game-results.component.scss'],
})
export class TeamGameResultsComponent implements OnInit {
  team?: TeamI;
  games: GameI[] = [];
  gameResultsPeriod = GAME_RESULTS_PERIOD;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const teamId = +this.route.snapshot.params['teamId'];
    this.route.data
      .pipe(
        tap((data) => {
          this.games = data['games'];
          const game = this.games[0];
          if (teamId === game.home_team.id) this.team = game.home_team;
          else if (teamId === game.visitor_team.id)
            this.team = game.visitor_team;
        })
      )
      .subscribe();
  }
}

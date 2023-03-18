import { Component, OnInit } from '@angular/core';
import { TeamStatsService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private teamStatsService: TeamStatsService) {}
  ngOnInit() {
    this.teamStatsService.getAllNBATeams();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSelectorComponent } from './components';
import { ScoreRoutingModule } from './score-routing.module';
import { HomeComponent } from './pages';
import { TeamResultsCardComponent } from './components';
import { ResultsCardListComponent } from './components';
import { TeamsResultsTrackerComponent } from './pages';
import { TeamGameResultsComponent } from './pages';
import { API_URLS, URL_CONSTANTS } from './constants';

@NgModule({
  declarations: [
    TeamSelectorComponent,
    HomeComponent,
    TeamResultsCardComponent,
    ResultsCardListComponent,
    TeamsResultsTrackerComponent,
    TeamGameResultsComponent,
  ],
  imports: [CommonModule, ScoreRoutingModule],
  providers: [{ provide: URL_CONSTANTS, useValue: API_URLS }],
})
export class ScoreModule {}

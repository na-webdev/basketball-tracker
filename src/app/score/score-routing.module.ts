import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  TeamGameResultsComponent,
  TeamsResultsTrackerComponent,
} from './pages';
import { LatestGameResultsResolver } from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: TeamsResultsTrackerComponent, pathMatch: 'full' },
      {
        path: 'results/:teamId',
        component: TeamGameResultsComponent,
        resolve: { games: LatestGameResultsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LatestGameResultsResolver],
})
export class ScoreRoutingModule {}

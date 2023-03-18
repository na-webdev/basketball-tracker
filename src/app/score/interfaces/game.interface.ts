import { TeamI } from './team.interface';

export type GameResult = 'W' | 'L' | 'D';

export interface GameI {
  id: number;
  date: Date;
  home_team: TeamI;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: TeamI;
  visitor_team_score: number;
}

export interface TeamI {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
  avgPtsScored?: number;
  avgPtsConceded?: number;
  last_games?: ('W' | 'L' | 'D')[];
}

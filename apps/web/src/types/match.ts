export type MatchStatus =
  | 'UPCOMING'
  | 'LIVE'
  | 'FINISHED'
  | 'CANCELLED'
  | 'POSTPONED';

export type Sport =
  | 'FOOTBALL'
  | 'BASKETBALL'
  | 'TENNIS'
  | 'VOLLEYBALL'
  | 'RUGBY'
  | 'CRICKET'
  | 'HANDBALL';

export interface Match {
  _id: string;

  homeTeam: string;

  awayTeam: string;

  sport: Sport;

  league: string;

  country: string;

  kickoff: string;

  homeOdd: number;

  drawOdd: number;

  awayOdd: number;

  status: MatchStatus;

  homeScore?: number;

  awayScore?: number;

  bettingOpen: boolean;

  settled: boolean;

  createdAt: string;

  updatedAt: string;
}
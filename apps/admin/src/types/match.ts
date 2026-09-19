export interface Match {
  _id: string;

  homeTeam: string;
  awayTeam: string;

  sport: string;
  league: string;
  country: string;

  kickoff: string;

  homeOdd: number;
  drawOdd: number;
  awayOdd: number;

  status: string;

  bettingOpen: boolean;
  settled: boolean;

  homeScore?: number;
  awayScore?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMatchDto {
  homeTeam: string;
  awayTeam: string;

  sport: string;
  league: string;
  country: string;

  kickoff: string;

  homeOdd: number;
  drawOdd: number;
  awayOdd: number;
}
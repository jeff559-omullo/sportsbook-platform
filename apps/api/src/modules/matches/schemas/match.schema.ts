import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { MatchStatus } from '../enums/match-status.enum';
import { Sport } from '../enums/sport.enum';

export type MatchDocument = HydratedDocument<Match>;

@Schema({
  timestamps: true,
  collection: 'matches',
})
export class Match {
  @Prop({
    required: true,
    trim: true,
  })
  homeTeam: string;

  @Prop({
    required: true,
    trim: true,
  })
  awayTeam: string;

  @Prop({
    required: true,
    enum: Sport,
  })
  sport: Sport;

  @Prop({
    required: true,
    trim: true,
  })
  league: string;

  @Prop({
    required: true,
    trim: true,
  })
  country: string;

  @Prop({
    required: true,
  })
  kickoff: Date;

  @Prop({
    required: true,
    min: 1.01,
  })
  homeOdd: number;

  @Prop({
    required: true,
    min: 1.01,
  })
  drawOdd: number;

  @Prop({
    required: true,
    min: 1.01,
  })
  awayOdd: number;

  @Prop({
    type: String,
    enum: MatchStatus,
    default: MatchStatus.UPCOMING,
  })
  status: MatchStatus;

  @Prop({
    default: null,
  })
  homeScore?: number;

  @Prop({
    default: null,
  })
  awayScore?: number;

  @Prop({
    default: true,
  })
  bettingOpen: boolean;

  @Prop({
    default: false,
  })
  settled: boolean;

  @Prop({
    default: null,
  })
  createdBy?: string;

  @Prop({
    default: null,
  })
  updatedBy?: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

// Useful indexes
MatchSchema.index({ sport: 1 });
MatchSchema.index({ league: 1 });
MatchSchema.index({ kickoff: 1 });
MatchSchema.index({ status: 1 });
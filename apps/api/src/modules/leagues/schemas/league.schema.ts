import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Sport } from '../../matches/enums/sport.enum';
import { LeagueStatus } from '../enums/league-status.enum';

export type LeagueDocument = HydratedDocument<League>;

@Schema({
  timestamps: true,
  collection: 'leagues',
})
export class League {
  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  })
  shortName: string;

  @Prop({
    required: true,
    trim: true,
  })
  country: string;

  @Prop({
    required: true,
    enum: Sport,
  })
  sport: Sport;

  @Prop({
    default: '',
  })
  logo: string;

  @Prop({
    required: true,
  })
  season: string;

  @Prop({
    default: 1,
  })
  priority: number;

  @Prop({
    enum: LeagueStatus,
    default: LeagueStatus.ACTIVE,
  })
  status: LeagueStatus;
}

export const LeagueSchema =
  SchemaFactory.createForClass(League);

LeagueSchema.index({
  sport: 1,
});

LeagueSchema.index({
  country: 1,
});

LeagueSchema.index({
  status: 1,
});

LeagueSchema.index({
  priority: 1,
});
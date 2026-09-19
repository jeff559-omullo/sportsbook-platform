import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { League } from '../../leagues/schemas/league.schema';
import { TeamStatus } from '../enums/team-status.enum';

export type TeamDocument = HydratedDocument<Team>;

@Schema({
  timestamps: true,
  collection: 'teams',
})
export class Team {
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
    default: '',
  })
  logo: string;

  @Prop({
    type: Types.ObjectId,
    ref: League.name,
    required: true,
  })
  league: Types.ObjectId;

  @Prop({
    enum: TeamStatus,
    default: TeamStatus.ACTIVE,
  })
  status: TeamStatus;
}

export const TeamSchema =
  SchemaFactory.createForClass(Team);

TeamSchema.index({
  league: 1,
});

TeamSchema.index({
  country: 1,
});

TeamSchema.index({
  status: 1,
});
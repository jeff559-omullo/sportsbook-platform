import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

import { Sport } from '../enums/sport.enum';

export class CreateMatchDto {
  @IsString()
  homeTeam: string;

  @IsString()
  awayTeam: string;

  @IsEnum(Sport)
  sport: Sport;

  @IsString()
  league: string;

  @IsString()
  country: string;

  @IsDateString()
  kickoff: Date;

  @IsNumber()
  @Min(1.01)
  homeOdd: number;

  @IsNumber()
  @Min(1.01)
  drawOdd: number;

  @IsNumber()
  @Min(1.01)
  awayOdd: number;
}
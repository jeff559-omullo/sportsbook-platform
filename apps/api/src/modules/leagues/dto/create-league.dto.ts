import {
  IsEnum,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

import { Sport } from '../../matches/enums/sport.enum';

export class CreateLeagueDto {
  @IsString()
  name: string;

  @IsString()
  shortName: string;

  @IsString()
  country: string;

  @IsEnum(Sport)
  sport: Sport;

  @IsString()
  season: string;

  @IsNumber()
  @Min(1)
  priority: number;
}
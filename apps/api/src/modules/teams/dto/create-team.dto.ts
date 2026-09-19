import {
  IsMongoId,
  IsString,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  shortName: string;

  @IsString()
  country: string;

  @IsMongoId()
  league: string;
}
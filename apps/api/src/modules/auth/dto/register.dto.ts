import {
  IsMobilePhone,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsMobilePhone('en-KE')
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}
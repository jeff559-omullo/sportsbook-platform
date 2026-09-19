import {
  IsMobilePhone,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsMobilePhone('en-KE')
  phone: string;

  @IsString()
  password: string;
}
import {
  IsMobilePhone,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class DepositDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsMobilePhone('en-KE')
  phone: string;

  @IsString()
  reference: string;
}
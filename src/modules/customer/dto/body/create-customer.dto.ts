import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @Type(() => Number)
  chat_id: number;

  @IsString()
  @Type(() => String)
  phone_number: string;

  @IsString()
  @Type(() => String)
  fullname: string;
}

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCustomerDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  chat_id?: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  phone_number?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  fullname?: string;
}

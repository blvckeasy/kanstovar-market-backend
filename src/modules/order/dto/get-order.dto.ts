import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from 'src/core';
import { OrderProductDto } from './order-product.dto';
import { Type } from 'class-transformer';

export class GetOrdersFilterDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsMongoId()
  customer?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products?: OrderProductDto[];

  @IsOptional()
  @IsString()
  status?: OrderStatus;
}

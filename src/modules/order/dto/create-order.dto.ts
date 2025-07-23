import { IsArray, IsMongoId, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderProductDto } from './order-product.dto';

export class CreateOrderBodyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];

  @IsNumber()
  total_price_uzs: number;
}

export class CreateOrderDto extends CreateOrderBodyDto {
  @IsMongoId()
  customer: string;
}

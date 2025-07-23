import { IsMongoId, IsNumber, Min } from 'class-validator';

export class OrderProductDto {
  @IsMongoId()
  product: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

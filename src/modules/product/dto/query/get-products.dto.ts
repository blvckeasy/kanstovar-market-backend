import { IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  @IsOptional()
  brand?: string;
}

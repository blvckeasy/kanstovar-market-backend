import { IsOptional, IsString } from 'class-validator';

export class GetProductCategoriesDto {
  @IsOptional()
  @IsString()
  search?: string;
}

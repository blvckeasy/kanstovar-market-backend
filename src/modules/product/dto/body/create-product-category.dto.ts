import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @Type(() => String)
  name_uz: string;

  @IsString()
  @Type(() => String)
  name_ru: string;
}

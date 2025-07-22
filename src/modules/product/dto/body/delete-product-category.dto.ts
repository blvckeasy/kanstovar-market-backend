import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteProductCategoryDto {
  @IsString()
  @Type(() => String)
  _id: string;
}

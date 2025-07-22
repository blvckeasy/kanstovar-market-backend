import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductFilterDto {
  @IsString()
  @Type(() => String)
  _id: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  name_uz?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  name_ru?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  description_uz?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  description_ru?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price_uzs?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isAvailable?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

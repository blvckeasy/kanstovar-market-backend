import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ timestamps: true, collection: 'product-categories' })
export class ProductCategory {
  @Prop()
  name_uz: string;

  @Prop()
  name_ru: string;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);

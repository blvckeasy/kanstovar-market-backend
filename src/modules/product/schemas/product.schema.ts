import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true })
  name_uz: string;

  @Prop({ type: String, required: true })
  name_ru: string;

  @Prop({ type: String })
  description_uz?: string;

  @Prop({ type: String })
  description_ru?: string;

  @Prop({ type: [String], default: [] })
  images_urls: string[]; // Rasm URLlar

  @Prop({ required: true })
  price_uzs: number;

  @Prop({ type: Types.ObjectId, ref: 'ProductCategory', required: true })
  category: string;

  @Prop()
  brand?: string;

  @Prop({ default: false })
  isAvailable?: boolean; // Buyurtma qilish mumkinmi

  @Prop({ default: [] })
  tags?: string[]; // "daftar", "ruchka", "idish" va h.k.
}

export const ProductSchema = SchemaFactory.createForClass(Product);

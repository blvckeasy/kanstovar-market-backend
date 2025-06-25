import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  images_urls: string[]; // Rasm URLlar

  @Prop({ required: true })
  price: number;

  @Prop()
  category?: string;

  @Prop()
  brand?: string;

  @Prop({ default: false })
  isAvailable?: boolean; // Buyurtma qilish mumkinmi

  @Prop({ default: [] })
  tags?: string[]; // "daftar", "ruchka", "idish" va h.k.
}

export const ProductSchema = SchemaFactory.createForClass(Product);

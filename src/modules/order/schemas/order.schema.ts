import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from 'src/core';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];

  @Prop({ type: Number, required: true })
  total_price_uzs: number;

  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.SENT,
  })
  status: OrderStatus;

  @Prop()
  notes?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

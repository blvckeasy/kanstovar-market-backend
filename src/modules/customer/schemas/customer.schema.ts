import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true, collection: 'customers' })
export class Customer {
  @Prop({ required: true, type: Number })
  chat_id: number;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  phone_number: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class MultilangString {
  @Prop({ default: '' })
  uz: string;

  @Prop({ default: '' })
  ru: string;
}

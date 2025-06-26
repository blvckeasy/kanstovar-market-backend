import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

// PRE-SAVE HOOK: Parolni avtomatik hashlab saqlaydi
AdminSchema.pre<AdminDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Parol o'zgarmagan bo'lsa hash qilmaydi
  }

  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

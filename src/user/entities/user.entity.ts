/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    getters: true,
  },
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;


  @Prop()
  passwordHash: string;

  @Prop()
  phone: number;

  @Prop()
  isAdmin: string;

  @Prop()
  street: string;

  @Prop()
  apartment: string;

  @Prop()
  zip: number;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


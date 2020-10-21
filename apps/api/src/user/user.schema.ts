import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop({
    type: String,
    required: true
  })
  email: string;

  @Prop(String)
  bio: string;

  @Prop(String)
  avatar: string;

  @Prop(String)
  location: string;

  @Prop({
    type: String
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
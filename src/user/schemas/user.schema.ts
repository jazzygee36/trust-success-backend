import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  gender!: string;

  @Prop({ required: true })
  dob!: Date;

  @Prop({ required: true })
  occupation!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  country!: string;

  @Prop({ required: true })
  state!: string;

  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  zipCode!: number;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  acctType!: string;

  @Prop({ required: true })
  acctPin!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: false })
  isActive!: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  somePropertyName!: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

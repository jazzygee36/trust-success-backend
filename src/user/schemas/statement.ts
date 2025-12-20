import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum StatementStatus {
  Completed = 'completed',
  Pending = 'pending',
  Rejected = 'rejected',
}

export enum StatementType {
  Credit = 'credit',
  Debit = 'debit',
}

@Schema({ timestamps: true })
export class UserStatement extends Document {
  @Prop()
  acctType?: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  beneficiary: string;

  @Prop({ required: false })
  dob?: Date;

  @Prop()
  receipt?: string;

  @Prop({ required: true })
  senderAcctNumber: string;

  @Prop({ required: true })
  senderBank: string;

  @Prop({ enum: StatementStatus, default: StatementStatus.Pending })
  status: StatementStatus;

  @Prop({ enum: StatementType })
  type?: StatementType;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: MongooseSchema.Types.ObjectId;
}
export const UserStatementSchema = SchemaFactory.createForClass(UserStatement);

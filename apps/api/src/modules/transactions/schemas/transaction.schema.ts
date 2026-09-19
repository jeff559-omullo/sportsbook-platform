import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionDocument =
  HydratedDocument<Transaction>;

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  BET_PLACED = 'BET_PLACED',
  BET_WIN = 'BET_WIN',
  BET_LOSS = 'BET_LOSS',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Schema({
  timestamps: true,
})
export class Transaction {

  @Prop({
    required: true,
    unique: true,
  })
  transactionId: string;


  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  userId: Types.ObjectId;


  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  walletId: Types.ObjectId;


  @Prop({
    required: true,
  })
  amount: number;


  @Prop({
    required: true,
  })
  balanceBefore: number;


  @Prop({
    required: true,
  })
  balanceAfter: number;


  @Prop({
    default: 'KES',
  })
  currency: string;


  @Prop({
    enum: TransactionType,
    required: true,
  })
  type: TransactionType;


  @Prop({
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;


  @Prop()
  reference?: string;


  @Prop()
  description?: string;


  @Prop({
    type: Object,
  })
  metadata?: Record<string, any>;
}


export const TransactionSchema =
  SchemaFactory.createForClass(Transaction);
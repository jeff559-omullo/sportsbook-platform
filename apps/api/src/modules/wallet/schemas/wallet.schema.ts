import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { BaseSchema } from '../../../database/schemas/base.schema';
import { WalletStatus } from '../enums/wallet-status.enum';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({
  timestamps: true,
  collection: 'wallets',
})
export class Wallet extends BaseSchema {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

  @Prop({
    default: 'KES',
  })
  currency: string;

  @Prop({
    default: 0,
    min: 0,
  })
  balance: number;

  @Prop({
    default: 0,
    min: 0,
  })
  lockedBalance: number;

  @Prop({
    default: 0,
    min: 0,
  })
  bonusBalance: number;

  @Prop({
    type: String,
    enum: WalletStatus,
    default: WalletStatus.ACTIVE,
  })
  status: WalletStatus;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.index({ userId: 1 }, { unique: true });
WalletSchema.index({ status: 1 });
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Wallet,
  WalletDocument,
} from '../schemas/wallet.schema';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
  ) {}

  findByUserId(
    userId: string,
  ): Promise<WalletDocument | null> {
    return this.walletModel.findOne({
      userId,
    });
  }

  create(
    userId: string,
  ): Promise<WalletDocument> {
    return this.walletModel.create({
      userId,
    });
  }

  async createIfNotExists(
    userId: string,
  ): Promise<WalletDocument> {
    let wallet =
      await this.findByUserId(userId);

    if (!wallet) {
      wallet = await this.create(userId);
    }

    return wallet;
  }

  async deposit(
    userId: string,
    amount: number,
  ): Promise<WalletDocument | null> {
    return this.walletModel.findOneAndUpdate(
      {
        userId,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );
  }

  async withdraw(
    userId: string,
    amount: number,
  ): Promise<WalletDocument | null> {
    return this.walletModel.findOneAndUpdate(
      {
        userId,
        balance: {
          $gte: amount,
        },
      },
      {
        $inc: {
          balance: -amount,
        },
      },
      {
        new: true,
      },
    );
  }

  update(
    wallet: WalletDocument,
  ): Promise<WalletDocument> {
    return wallet.save();
  }
}
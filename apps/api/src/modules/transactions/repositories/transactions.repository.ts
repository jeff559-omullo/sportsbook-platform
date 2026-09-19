
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  create(data: Partial<Transaction>) {
    return this.transactionModel.create(data);
  }

  findByTransactionId(transactionId: string) {
    return this.transactionModel.findOne({
      transactionId,
    });
  }

  findByCheckoutRequestId(checkoutRequestId: string) {
    return this.transactionModel.findOne({
      'metadata.checkoutRequestId': checkoutRequestId,
    });
  }

  findByMerchantRequestId(merchantRequestId: string) {
    return this.transactionModel.findOne({
      'metadata.merchantRequestId': merchantRequestId,
    });
  }

  updateStatus(
    transactionId: string,
    status: string,
    metadata?: Record<string, any>,
  ) {
    const update: any = {
      status,
    };

    if (metadata) {
      update.metadata = metadata;
    }

    return this.transactionModel.findOneAndUpdate(
      {
        transactionId,
      },
      {
        $set: update,
      },
      {
        new: true,
      },
    );
  }

  findByUserId(userId: string) {
    return this.transactionModel
      .find({
        userId,
      })
      .sort({
        createdAt: -1,
      });
  }
}



import { Injectable } from '@nestjs/common';

import {
  TransactionsRepository,
} from '../repositories/transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(data: any) {
    return this.transactionsRepository.create(data);
  }

  findByTransactionId(transactionId: string) {
    return this.transactionsRepository.findByTransactionId(
      transactionId,
    );
  }

  findByCheckoutRequestId(checkoutRequestId: string) {
    return this.transactionsRepository.findByCheckoutRequestId(
      checkoutRequestId,
    );
  }

  findByMerchantRequestId(merchantRequestId: string) {
    return this.transactionsRepository.findByMerchantRequestId(
      merchantRequestId,
    );
  }

  updateStatus(
    transactionId: string,
    status: string,
    metadata?: Record<string, any>,
  ) {
    return this.transactionsRepository.updateStatus(
      transactionId,
      status,
      metadata,
    );
  }

  findUserTransactions(userId: string) {
    return this.transactionsRepository.findByUserId(userId);
  }
}


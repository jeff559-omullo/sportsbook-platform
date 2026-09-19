import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Transaction,
  TransactionSchema,
} from './schemas/transaction.schema';

import { TransactionsService } from './services/transactions.service';
import { TransactionsRepository } from './repositories/transactions.repository';


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],

  providers:[
    TransactionsService,
    TransactionsRepository,
  ],

  exports:[
    TransactionsService,
  ],
})
export class TransactionsModule {}
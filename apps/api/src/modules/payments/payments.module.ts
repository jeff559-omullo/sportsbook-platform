import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { PaymentsController } from './controllers/payments.controller';
import { PaymentsService } from './services/payments.service';
import { MegapayService } from './services/megapay.service';

import { WalletModule } from '../wallet/wallet.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    WalletModule,
    TransactionsModule,
  ],

  controllers: [
    PaymentsController,
  ],

  providers: [
    PaymentsService,
    MegapayService,
  ],

  exports: [
    PaymentsService,
  ],
})
export class PaymentsModule {}
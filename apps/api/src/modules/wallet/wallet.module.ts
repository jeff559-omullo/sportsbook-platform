import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Wallet,
  WalletSchema,
} from './schemas/wallet.schema';

import { WalletService } from './services/wallet.service';
import { WalletRepository } from './repositories/wallet.repository';

import { WalletController } from './controllers/wallet.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
    ]),
  ],

  controllers: [
    WalletController,
  ],

  providers: [
    WalletService,
    WalletRepository,
  ],

  exports: [
    WalletService,
  ],
})
export class WalletModule {}
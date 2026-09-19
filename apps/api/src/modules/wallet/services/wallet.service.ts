import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { WalletRepository } from '../repositories/wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
  ) {}

  async getWallet(
    userId: string,
  ) {
    return this.walletRepository.createIfNotExists(
      userId,
    );
  }

  async deposit(
    userId: string,
    amount: number,
  ) {
    if (amount <= 0) {
      throw new BadRequestException(
        'Deposit amount must be greater than zero.',
      );
    }

    const wallet =
      await this.walletRepository.deposit(
        userId,
        amount,
      );

    if (!wallet) {
      throw new BadRequestException(
        'Failed to update wallet balance.',
      );
    }

    return wallet;
  }

  async withdraw(
    userId: string,
    amount: number,
  ) {
    if (amount <= 0) {
      throw new BadRequestException(
        'Withdrawal amount must be greater than zero.',
      );
    }

    const wallet =
      await this.walletRepository.withdraw(
        userId,
        amount,
      );

    if (!wallet) {
      throw new BadRequestException(
        'Insufficient wallet balance.',
      );
    }

    return wallet;
  }

  async balance(
    userId: string,
  ) {
    const wallet =
      await this.walletRepository.findByUserId(
        userId,
      );

    if (!wallet) {
      throw new BadRequestException(
        'Wallet not found.',
      );
    }

    return wallet;
  }
}
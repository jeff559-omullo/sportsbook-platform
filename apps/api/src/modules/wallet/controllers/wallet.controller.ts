import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { WalletService } from '../services/wallet.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getWallet(
    @CurrentUser() user: any,
  ) {
    return this.walletService.getWallet(
      user.sub,
    );
  }
}
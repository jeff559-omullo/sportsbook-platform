import {
  Body,
  Controller,
  Post,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';

import { PaymentsService } from '../services/payments.service';
import { DepositDto } from '../dto/deposit.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  /**
   * Start M-Pesa STK Push
   *
   * POST /api/v1/payments/deposit
   */
  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  deposit(
    @CurrentUser() user: any,
    @Body() dto: DepositDto,
  ) {
    return this.paymentsService.deposit(
      user.sub,
      dto,
    );
  }

  /**
   * Manual transaction verification.
   *
   * POST /api/v1/payments/verify
   */
  
@UseGuards(JwtAuthGuard)
@Post('verify')
verify(
  @CurrentUser() user: any,
  @Body()
  body: {
    transactionRequestId: string;
  },
) {
  if (!body?.transactionRequestId) {
    throw new BadRequestException(
      'transactionRequestId is required',
    );
  }

  return this.paymentsService.verifyDeposit(
    user.sub,
    body.transactionRequestId,
  );
}


  /**
   * MegaPay webhook.
   *
   * IMPORTANT:
   * No JWT guard here.
   *
   * MegaPay calls this endpoint directly.
   *
   * POST /api/v1/payments/webhook
   */
  @Post('webhook')
  webhook(
    @Body() payload: any,
  ) {
    return this.paymentsService.handleMpesaCallback(
      payload,
    );
  }
}

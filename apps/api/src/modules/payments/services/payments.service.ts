import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { DepositDto } from '../dto/deposit.dto';
import { MegapayService } from './megapay.service';

import { WalletService } from '../../wallet/services/wallet.service';
import { TransactionsService } from '../../transactions/services/transactions.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly megapayService: MegapayService,
    private readonly walletService: WalletService,
    private readonly transactionsService: TransactionsService,
  ) {}

  /**
   * Start MegaPay STK Push
   *
   * IMPORTANT:
   * We first create a PENDING transaction in our database.
   * This allows the webhook to identify the customer later.
   */
  async deposit(
    userId: string,
    dto: DepositDto,
  ) {
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException(
        'Deposit amount must be greater than zero.',
      );
    }

    const wallet =
      await this.walletService.getWallet(userId);

    /*
     * Generate reference if frontend did not provide one.
     */
    const reference =
      dto.reference ||
      `DEP-${Date.now()}`;

    /*
     * Initiate MegaPay STK.
     */
    const result =
      await this.megapayService.initiateSTK(
        dto.amount,
        dto.phone,
        reference,
      );

    console.log('========== MEGAPAY STK ==========');
    console.log(JSON.stringify(result, null, 2));
    console.log('=================================');

    /*
     * MegaPay should return ResultCode 0
     * and a transaction_request_id.
     */
    if (
      !result ||
      String(result.ResultCode) !== '0' ||
      !result.transaction_request_id
    ) {
      throw new BadRequestException(
        result?.message ||
          result?.ResponseDescription ||
          'Failed to initiate M-Pesa payment.',
      );
    }

    /*
     * SAVE PENDING TRANSACTION
     *
     * This is the important missing part in your
     * current implementation.
     */
    await this.transactionsService.create({
      transactionId:
        result.transaction_request_id,

      userId,

      walletId: wallet._id,

      amount: Number(dto.amount),

      balanceBefore: Number(wallet.balance),

      balanceAfter: Number(wallet.balance),

      currency: 'KES',

      type: 'DEPOSIT',

      status: 'PENDING',

      reference,

      description: 'MegaPay Deposit',

      metadata: {
        phone: dto.phone,

        transactionRequestId:
          result.transaction_request_id,

        merchantRequestId:
          result.MerchantRequestID,

        checkoutRequestId:
          result.CheckoutRequestID,

        megapayResponse: result,
      },
    });

    console.log(
      '📝 PENDING DEPOSIT SAVED:',
      result.transaction_request_id,
    );

    return {
      success: true,

      status: 'PENDING',

      message:
        'STK Push sent. Please enter your M-Pesa PIN.',

      transactionRequestId:
        result.transaction_request_id,

      merchantRequestId:
        result.MerchantRequestID,

      checkoutRequestId:
        result.CheckoutRequestID,

      reference,

      amount: dto.amount,
    };
  }

  /**
   * Manual verification.
   *
   * This remains available as a fallback.
   */
  async verifyDeposit(
    userId: string,
    transactionRequestId: string,
  ) {
    console.log('========================================');
    console.log('VERIFYING TRANSACTION');
    console.log('User ID:', userId);
    console.log(
      'Transaction Request ID:',
      transactionRequestId,
    );

    const maxAttempts = 10;
    const delayMs = 3000;

    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {
      console.log(
        `🔄 Verification attempt ${attempt}/${maxAttempts}`,
      );

      const result =
        await this.megapayService.verifyTransaction(
          transactionRequestId,
        );

      console.log(
        '========== VERIFY RESPONSE ==========',
      );

      console.log(
        JSON.stringify(result, null, 2),
      );

      console.log(
        '=====================================',
      );

      /*
       * MegaPay says transaction is still pending.
       */
      if (
        result.TransactionStatus === 'Pending' ||
        String(result.ResultCode) === '200'
      ) {
        if (attempt < maxAttempts) {
          await new Promise((resolve) =>
            setTimeout(resolve, delayMs),
          );

          continue;
        }

        return {
          success: false,
          status: 'PENDING',
          message:
            'Payment is still being processed by MegaPay.',
          providerResponse: result,
        };
      }

      /*
       * Payment failed.
       */
      if (
        result.TransactionStatus !== 'Completed' &&
        result.TransactionStatus !== 'Success' &&
        String(result.ResultCode) !== '0'
      ) {
        throw new BadRequestException(
          result.ResultDesc ||
            'Payment failed.',
        );
      }

      /*
       * Payment successful.
       */
      return this.completeDeposit(
        userId,
        transactionRequestId,
        result,
      );
    }

    throw new BadRequestException(
      'Unable to determine payment status.',
    );
  }

  /**
   * MegaPay webhook.
   *
   * MegaPay calls:
   *
   * POST /api/v1/payments/webhook
   */
  async handleMpesaCallback(
    callback: any,
  ) {
    console.log('========================================');
    console.log('📥 MEGAPAY WEBHOOK RECEIVED');
    console.log(
      JSON.stringify(callback, null, 2),
    );
    console.log('========================================');

    const transactionRequestId =
      callback?.TransactionRequestID ??
      callback?.transaction_request_id ??
      callback?.TransactionRequestId;

    const checkoutRequestId =
      callback?.CheckoutRequestID ??
      callback?.checkout_request_id;

    const merchantRequestId =
      callback?.MerchantRequestID ??
      callback?.merchant_request_id;

    console.log(
      'Transaction Request ID:',
      transactionRequestId,
    );

    console.log(
      'Checkout Request ID:',
      checkoutRequestId,
    );

    console.log(
      'Merchant Request ID:',
      merchantRequestId,
    );

    /*
     * We MUST have at least one identifier.
     */
    if (
      !transactionRequestId &&
      !checkoutRequestId &&
      !merchantRequestId
    ) {
      throw new BadRequestException(
        'MegaPay webhook contains no transaction identifier.',
      );
    }

    /*
     * First try transaction_request_id.
     *
     * This is what your STK response gave us:
     *
     * PFXID31082026090506275114567007
     */
    let transaction: any = null;

    if (transactionRequestId) {
      transaction =
        await this.transactionsService.findByTransactionId(
          transactionRequestId,
        );
    }

    /*
     * If MegaPay webhook does not contain the transaction
     * request ID, we need to find it using CheckoutRequestID
     * or MerchantRequestID stored in metadata.
     *
     * These methods will be added to TransactionsService
     * after you send me the repository.
     */
    if (!transaction && checkoutRequestId) {
      transaction =
        await this.transactionsService
          .findByCheckoutRequestId(
            checkoutRequestId,
          );
    }

    if (!transaction && merchantRequestId) {
      transaction =
        await this.transactionsService
          .findByMerchantRequestId(
            merchantRequestId,
          );
    }

    /*
     * We cannot safely credit a wallet if we cannot
     * identify the original transaction.
     */
    if (!transaction) {
      console.error(
        '❌ PENDING TRANSACTION NOT FOUND',
      );

      return {
        success: false,
        status: 'UNMATCHED',
        message:
          'Transaction not found in our database.',
        transactionRequestId,
        checkoutRequestId,
        merchantRequestId,
      };
    }

    console.log(
      '✅ OUR TRANSACTION FOUND:',
      transaction,
    );

    /*
     * Never process the same transaction twice.
     */
    if (transaction.status === 'COMPLETED') {
      console.log(
        'ℹ️ Transaction already completed.',
      );

      return {
        success: true,
        status: 'ALREADY_PROCESSED',
        message:
          'Transaction already processed.',
      };
    }

    /*
     * Read MegaPay result.
     */
    const resultCode =
      callback?.ResultCode ??
      callback?.result_code ??
      callback?.ResponseCode ??
      callback?.response_code;

    const transactionStatus =
      callback?.TransactionStatus ??
      callback?.transaction_status ??
      callback?.status;

    console.log(
      'ResultCode:',
      resultCode,
    );

    console.log(
      'TransactionStatus:',
      transactionStatus,
    );

    /*
     * Still pending.
     */
    if (
      String(resultCode) === '200' ||
      transactionStatus === 'Pending'
    ) {
      console.log(
        '⏳ MegaPay payment still pending.',
      );

      return {
        success: true,
        status: 'PENDING',
        message:
          'Payment is still pending.',
      };
    }

    /*
     * Successful payment.
     */
    const successful =
      String(resultCode) === '0' ||
      transactionStatus === 'Completed' ||
      transactionStatus === 'Success';

    /*
     * Failed payment.
     */
    if (!successful) {
      console.log(
        '❌ MegaPay payment failed.',
      );

      await this.transactionsService.updateStatus(
        transaction.transactionId,
        'FAILED',
      );

      return {
        success: false,
        status: 'FAILED',
        message:
          callback?.ResultDesc ??
          callback?.ResponseDescription ??
          'Payment failed.',
      };
    }

    /*
     * VERY IMPORTANT:
     *
     * Get userId from OUR database.
     *
     * Do NOT trust userId from MegaPay.
     */
    const userId =
      transaction.userId;

    if (!userId) {
      throw new BadRequestException(
        'Transaction has no associated user.',
      );
    }

    /*
     * Complete the deposit.
     */
    return this.completeDeposit(
      userId,
      transaction.transactionId,
      callback,
    );
  }

  /**
   * Credit wallet and mark transaction completed.
   */
  private async completeDeposit(
    userId: string,
    transactionRequestId: string,
    result: any,
  ) {
    console.log(
      '💰 COMPLETING DEPOSIT:',
      transactionRequestId,
    );

    /*
     * Find transaction.
     */
    const transaction =
      await this.transactionsService.findByTransactionId(
        transactionRequestId,
      );

    if (!transaction) {
      throw new BadRequestException(
        'Deposit transaction not found.',
      );
    }

    /*
     * Idempotency protection.
     */
    if (transaction.status === 'COMPLETED') {
      return {
        success: true,
        status: 'ALREADY_PROCESSED',
        message:
          'Transaction already processed.',
      };
    }

    /*
     * Amount returned by MegaPay.
     *
     * If MegaPay does not send it in the callback,
     * use the amount saved when STK was initiated.
     */
    const amount = Number(
      result?.TransactionAmount ??
      result?.transaction_amount ??
      result?.Amount ??
      result?.amount ??
      transaction.amount,
    );

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      throw new BadRequestException(
        `Invalid deposit amount: ${amount}`,
      );
    }

    /*
     * Get wallet.
     */
    const wallet =
      await this.walletService.getWallet(
        userId,
      );

    const balanceBefore =
      Number(wallet.balance);

    /*
     * CREDIT WALLET.
     */
    const updatedWallet =
      await this.walletService.deposit(
        userId,
        amount,
      );

    /*
     * Mark original PENDING transaction
     * as COMPLETED.
     */
    await this.transactionsService.updateStatus(
      transactionRequestId,
      'COMPLETED',
      {
        balanceBefore,
        balanceAfter:
          updatedWallet.balance,

        transactionCode:
          result?.TransactionCode ??
          result?.transaction_code,

        transactionReceipt:
          result?.TransactionReceipt ??
          result?.transaction_receipt,

        transactionReference:
          result?.TransactionReference ??
          result?.transaction_reference,

        megapayResponse: result,
      },
    );

    console.log('========================================');
    console.log('💰 WALLET CREDITED SUCCESSFULLY');
    console.log('User ID:', userId);
    console.log('Amount:', amount);
    console.log(
      'Balance Before:',
      balanceBefore,
    );
    console.log(
      'Balance After:',
      updatedWallet.balance,
    );
    console.log('========================================');

    return {
      success: true,
      status: 'COMPLETED',

      wallet: updatedWallet,

      transaction: {
        transactionId:
          transactionRequestId,

        amount,

        status: 'COMPLETED',

        reference:
          result?.TransactionReference ??
          result?.transaction_reference ??
          transaction.reference,
      },
    };
  }
}

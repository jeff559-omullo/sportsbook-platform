import {
  BadGatewayException,
  GatewayTimeoutException,
  Injectable,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class MegapayService {
  private readonly apiKey: string;
  private readonly email: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.apiKey =
      this.config.getOrThrow(
        'payments.megapay.apiKey',
      );

    this.email =
      this.config.getOrThrow(
        'payments.megapay.email',
      );

    this.baseUrl =
      this.config.getOrThrow(
        'payments.megapay.baseUrl',
      );

    this.timeoutMs =
      Number(
        this.config.get<number>(
          'payments.megapay.timeoutMs',
        ) ?? 10000,
      );
  }

  /**
   * Initiate MegaPay STK Push
   */
  async initiateSTK(
    amount: number,
    phone: string,
    reference: string,
  ) {
    try {
      const payload = {
        api_key: this.apiKey,
        email: this.email,
        amount,
        msisdn: phone,
        reference,
      };

      const response =
        await firstValueFrom(
          this.http.post(
            `${this.baseUrl}/initiatestk`,
            payload,
            {
              timeout: this.timeoutMs,
              headers: {
                'Content-Type':
                  'application/json',
              },
            },
          ),
        );

      console.log(
        '========== MEGAPAY STK ==========',
      );

      console.log(
        JSON.stringify(
          response.data,
          null,
          2,
        ),
      );

      console.log(
        '=================================',
      );

      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.ResponseDescription ||
        error?.response?.data ||
        error?.message ||
        'Failed to initiate STK Push';

      console.error(
        'MegaPay STK error:',
        message,
      );

      if (
        error?.code === 'ECONNABORTED' ||
        String(error?.message || '')
          .toLowerCase()
          .includes('timeout')
      ) {
        throw new GatewayTimeoutException(
          'MegaPay timed out while initiating the M-Pesa STK push. Please retry.',
        );
      }

      throw new BadGatewayException(message);
    }
  }

  /**
   * Verify MegaPay transaction
   */
  async verifyTransaction(
    transactionRequestId: string,
  ) {
    try {
      const payload = {
        api_key: this.apiKey,
        email: this.email,
        transaction_request_id:
          transactionRequestId,
      };

      const { data } =
        await firstValueFrom(
          this.http.post(
            `${this.baseUrl}/transactionstatus`,
            payload,
            {
              timeout: this.timeoutMs,
              headers: {
                'Content-Type':
                  'application/json',
              },
            },
          ),
        );

      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.ResponseDescription ||
        error?.response?.data ||
        error?.message ||
        'Failed to verify transaction';

      console.error(
        'MegaPay verification error:',
        message,
      );

      if (
        error?.code === 'ECONNABORTED' ||
        String(error?.message || '')
          .toLowerCase()
          .includes('timeout')
      ) {
        throw new GatewayTimeoutException(
          'MegaPay timed out while checking the M-Pesa transaction status.',
        );
      }

      throw new BadGatewayException(message);
    }
  }
}

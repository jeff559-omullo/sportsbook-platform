import { GatewayTimeoutException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { MegapayService } from './megapay.service';

describe('MegapayService', () => {
  const makeService = (postMock: any) => {
    const http = { post: postMock };
    const config = {
      get: (key: string, fallback?: any) => {
        const values = {
          'payments.megapay.apiKey': 'test-api-key',
          'payments.megapay.email': 'user@example.com',
          'payments.megapay.baseUrl': 'https://megapay.co.ke/backend/v1',
          'payments.megapay.timeoutMs': 1000,
        };
        return values[key] ?? fallback;
      },
      getOrThrow: (key: string) => {
        const values = {
          'payments.megapay.apiKey': 'test-api-key',
          'payments.megapay.email': 'user@example.com',
          'payments.megapay.baseUrl': 'https://megapay.co.ke/backend/v1',
          'payments.megapay.timeoutMs': 1000,
        };
        return values[key];
      },
    };

    return new MegapayService(http as any, config as any);
  };

  it('returns the STK payload on success', async () => {
    const service = makeService(
      jest.fn().mockReturnValue(
        of({
          data: {
            ResultCode: '0',
            transaction_request_id: 'txn-123',
          },
        }),
      ),
    );

    const result = await service.initiateSTK(
      100,
      '254712345678',
      'REF-123',
    );

    expect(result).toEqual({
      ResultCode: '0',
      transaction_request_id: 'txn-123',
    });
    expect(service['baseUrl']).toBe(
      'https://megapay.co.ke/backend/v1',
    );
  });

  it('throws a gateway timeout when MegaPay does not respond in time', async () => {
    const service = makeService(
      jest.fn().mockReturnValue(
        throwError(() => ({
          code: 'ECONNABORTED',
          message: 'timeout of 1000ms exceeded',
        })),
      ),
    );

    await expect(
      service.initiateSTK(
        100,
        '254712345678',
        'REF-123',
      ),
    ).rejects.toThrow(GatewayTimeoutException);
  });
});

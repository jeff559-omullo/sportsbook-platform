import api from "@/lib/api";

export interface DepositDto {
  phone: string;
  amount: number;
  reference: string;
}

class PaymentsService {
  deposit(data: DepositDto) {
    return api.post("/payments/deposit", data);
  }

  verify(transactionRequestId: string) {
    return api.post("/payments/verify", {
      transactionRequestId,
    });
  }
}

export default new PaymentsService();
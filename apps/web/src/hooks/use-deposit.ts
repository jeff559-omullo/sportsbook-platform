import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface DepositDto {
  amount: number;
  phone: string;
  reference: string;
}

interface DepositResponse {
  success: boolean;
  status: string;
  message: string;
  transactionRequestId?: string;
  merchantRequestId?: string;
  checkoutRequestId?: string;
  amount?: number;
}

export function useDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DepositDto) => {
      const response =
        await api.post<DepositResponse>(
          "/payments/deposit",
          data,
        );

      return response.data;
    },

    onSuccess: async (response) => {
      const transactionRequestId =
        response.transactionRequestId ||
        response.merchantRequestId;

      console.log(
        "VERIFYING:",
        transactionRequestId
      );

      if (!transactionRequestId) {
        alert(
          "Deposit started, but no transaction reference was returned. Please refresh and try again."
        );
        return;
      }



      let attempts = 0;

      // 5 minutes (60 x 5 seconds)
      const maxAttempts = 60;



      const timer = setInterval(async () => {


        attempts++;


        try {


          const verify =
            await api.post(
              "/payments/verify",
              {
                transactionRequestId,
              },
            );



          console.log(
            "VERIFY RESULT:",
            verify.data
          );




          // Payment completed
          if (
            verify.data.success === true
          ) {


            clearInterval(timer);



            // Force wallet refresh immediately
            await queryClient.refetchQueries({
              queryKey: [
                "wallet",
              ],
            });



            await queryClient.refetchQueries({
              queryKey: [
                "transactions",
              ],
            });



            alert(
              "Deposit completed successfully."
            );


            return;

          }




          // Still waiting
          if (
            verify.data.status === "PENDING"
          ) {

            console.log(
              "Payment still pending..."
            );

          }



        } catch(error) {


          console.log(
            "Verification error:",
            error
          );


        }




        if (
          attempts >= maxAttempts
        ) {


          clearInterval(timer);


          alert(
            "Payment verification timeout. Check your wallet later."
          );


        }



      },5000);
      



    },

  });

}
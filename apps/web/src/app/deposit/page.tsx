"use client";

import { useState } from "react";
import { useDeposit } from "@/hooks/use-deposit";

export default function DepositPage() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const deposit = useDeposit();

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!phone || !amount) {
      return;
    }

    deposit.mutate({
      phone,
      amount: Number(amount),
      reference: `DEP-${Date.now()}`,
    });
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-slate-900 p-6 text-white shadow-lg">
      <h1 className="mb-2 text-2xl font-bold">
        Deposit Funds
      </h1>

      <p className="mb-6 text-sm text-slate-400">
        Enter your M-Pesa number and amount. An STK Push will be sent to your
        phone. Your wallet balance will update automatically once payment is
        confirmed.
      </p>

      <form
        onSubmit={submit}
        className="space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            M-Pesa Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="254712345678"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-green-500"
            disabled={deposit.isPending}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Amount (KES)
          </label>

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            placeholder="100"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-green-500"
            disabled={deposit.isPending}
          />
        </div>

        <button
          type="submit"
          disabled={
            deposit.isPending ||
            !phone ||
            !amount
          }
          className="w-full rounded-lg bg-green-600 py-3 font-semibold transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deposit.isPending
            ? "Sending STK Push..."
            : "Deposit"}
        </button>

        {deposit.isSuccess && (
          <div className="rounded-lg border border-blue-700 bg-blue-900/40 p-4 text-blue-300">
            <p className="font-semibold">
              STK Push Sent
            </p>

            <p className="mt-1 text-sm">
              Check your phone and enter your M-Pesa PIN.
            </p>

            <p className="mt-2 text-sm">
              We are automatically verifying your payment.
              Your wallet balance will update once the
              payment is confirmed.
            </p>
          </div>
        )}

        {deposit.isError && (
          <div className="rounded-lg border border-red-700 bg-red-900/40 p-4 text-red-300">
            <p className="font-semibold">
              Deposit Failed
            </p>

            <p className="mt-1 text-sm">
              {deposit.error instanceof Error
                ? deposit.error.message
                : "Unable to start the deposit. Please try again."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
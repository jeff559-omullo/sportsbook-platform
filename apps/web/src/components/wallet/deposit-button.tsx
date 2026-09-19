"use client";

import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";

export default function DepositButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/deposit")}
      className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500"
    >
      <Wallet size={18} />
      Deposit
    </button>
  );
}
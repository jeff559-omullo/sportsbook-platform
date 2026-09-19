"use client";

import Link from "next/link";

import { useMe } from "@/hooks/use-me";

export default function ProfilePage() {
  const {
    data: user,
    isLoading,
    error,
  } = useMe();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-red-500">
        Failed to load profile.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md p-5">

      <div className="rounded-2xl bg-slate-900 p-6">

        <div className="flex flex-col items-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white">
            {user?.phone?.charAt(0)}
          </div>

          <h1 className="mt-4 text-xl font-bold text-white">
            {user?.phone}
          </h1>

          <p className="mt-1 text-sm text-slate-400 capitalize">
            {user?.role}
          </p>

        </div>

        <div className="mt-8 rounded-xl bg-slate-800 p-5">

          <p className="text-slate-400">
            Wallet Balance
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-400">
            KES 0.00
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <Link
              href="/deposit"
              className="rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-500"
            >
              Deposit
            </Link>

            <Link
              href="/withdraw"
              className="rounded-xl border border-slate-700 py-3 text-center font-semibold text-white hover:bg-slate-700"
            >
              Withdraw
            </Link>

          </div>

        </div>

        <div className="mt-8 space-y-3">

          <Link
            href="/my-bets"
            className="block rounded-xl bg-slate-800 p-4 text-white hover:bg-slate-700"
          >
            My Bets
          </Link>

          <Link
            href="/transactions"
            className="block rounded-xl bg-slate-800 p-4 text-white hover:bg-slate-700"
          >
            Transactions
          </Link>

          <Link
            href="/settings"
            className="block rounded-xl bg-slate-800 p-4 text-white hover:bg-slate-700"
          >
            Settings
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.href = "/login";
            }}
            className="w-full rounded-xl bg-red-600 p-4 font-semibold text-white hover:bg-red-500"
          >
            Logout
          </button>

        </div>

      </div>

    </main>
  );
}
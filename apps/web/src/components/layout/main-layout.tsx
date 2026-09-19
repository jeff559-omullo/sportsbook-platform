"use client";

import { ReactNode, useMemo, useState } from "react";
import Navbar from "../navbar/navbar";
import BetSlip from "../betslip/betslip";
import { useBetSlipStore } from "@/store/betslip.store";

interface MainLayoutProps {
  children: ReactNode;
  betSlip: ReactNode;
}

export default function MainLayout({
  children,
  betSlip,
}: MainLayoutProps) {
  const [open, setOpen] = useState(false);

  const { selections } = useBetSlipStore();

  const totalOdds = useMemo(() => {
    if (selections.length === 0) return 0;

    return selections.reduce(
      (t, s) => t * s.odd,
      1,
    );
  }, [selections]);

  const stake = 100;

  const potentialWin = totalOdds * stake;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          gap-6
          px-3
          py-4
          sm:px-5
          lg:px-6
        "
      >

        <main className="min-w-0 flex-1 pb-24 xl:pb-0">
          {children}
        </main>

        <aside className="hidden w-80 shrink-0 xl:block">
          {betSlip}
        </aside>

      </div>

      {/* Mobile Bottom Bar */}

      <div className="fixed bottom-0 left-0 right-0 z-50 xl:hidden">

        <button
          onClick={() => setOpen(true)}
          className="
            flex
            h-16
            w-full
            items-center
            justify-between
            border-t
            border-slate-700
            bg-slate-900
            px-5
          "
        >

          <div>

            <p className="text-xs text-slate-400">
              Bet Slip
            </p>

            <p className="font-semibold">

              {selections.length}{" "}
              {selections.length === 1
                ? "Selection"
                : "Selections"}

            </p>

          </div>

          <div className="rounded-lg bg-green-600 px-4 py-2 font-bold">

            KES {potentialWin.toFixed(2)}

          </div>

        </button>

      </div>

      {/* Mobile Full Slip */}

      {open && (

        <div className="fixed inset-0 z-[100] bg-black/60 xl:hidden">

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              max-h-[90vh]
              overflow-auto
              rounded-t-3xl
              bg-slate-950
              p-4
            "
          >

            <div className="mb-4 flex justify-between">

              <h2 className="text-xl font-bold">
                Bet Slip
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-3xl"
              >
                ×
              </button>

            </div>

            <BetSlip />

          </div>

        </div>

      )}

    </div>
  );
}
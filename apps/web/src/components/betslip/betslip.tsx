"use client";

import { useMemo, useState } from "react";
import { ReceiptText, Trash2 } from "lucide-react";

import { useBetSlipStore } from "@/store/betslip.store";

export default function BetSlip() {
  const [stake, setStake] = useState(100);

  const { selections, toggleSelection } =
    useBetSlipStore();

  const totalOdds = useMemo(() => {
    if (!selections.length) return 0;

    return selections.reduce(
      (total, selection) => total * selection.odd,
      1,
    );
  }, [selections]);

  const potentialWin = stake * totalOdds;

  return (
    <div className="sticky top-4 rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Bet Slip
          </h2>

          <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-bold">
            {selections.length}
          </span>

        </div>

      </div>

      <div className="max-h-[420px] overflow-y-auto">

        {selections.length === 0 ? (

          <div className="flex flex-col items-center justify-center p-10">

            <ReceiptText
              size={60}
              className="text-slate-600"
            />

            <p className="mt-4 text-lg font-semibold">
              No Bets Selected
            </p>

            <p className="mt-2 text-center text-sm text-slate-500">
              Tap any odd to add it to your bet slip.
            </p>

          </div>

        ) : (

          <div className="space-y-3 p-4">

            {selections.map((selection) => (

              <div
                key={`${selection.id}-${selection.market}`}
                className="rounded-xl bg-slate-800 p-4"
              >

                <div className="flex justify-between">

                  <div>

                    <p className="font-semibold">
                      {selection.home}
                    </p>

                    <p className="text-sm text-slate-400">
                      vs {selection.away}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      toggleSelection(selection)
                    }
                    className="rounded-lg p-2 hover:bg-slate-700"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-sm text-slate-400">
                    {selection.market}
                  </span>

                  <span className="rounded-lg bg-green-600 px-3 py-1 font-bold">
                    {selection.odd}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {selections.length > 0 && (

        <div className="border-t border-slate-800 p-5">

          <label className="mb-2 block text-sm text-slate-400">
            Stake (KES)
          </label>

          <input
            type="number"
            min={1}
            value={stake}
            onChange={(e) =>
              setStake(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-green-500"
          />

          <div className="mt-5 space-y-2">

            <div className="flex justify-between">

              <span className="text-slate-400">
                Total Odds
              </span>

              <span className="font-semibold">
                {totalOdds.toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Potential Win
              </span>

              <span className="text-xl font-bold text-green-400">
                KES {potentialWin.toFixed(2)}
              </span>

            </div>

          </div>

          <button className="mt-6 w-full rounded-xl bg-green-600 py-4 text-lg font-bold transition hover:bg-green-500">
            Place Bet
          </button>

        </div>

      )}

    </div>
  );
}
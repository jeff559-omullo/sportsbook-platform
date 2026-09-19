"use client";

import { Calendar, Clock } from "lucide-react";

import { Match } from "@/types/match";
import { useBetSlipStore } from "@/store/betslip.store";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({
  match,
}: MatchCardProps) {
  const {
    selections,
    toggleSelection,
  } = useBetSlipStore();

  const isSelected = (
    market: "HOME" | "DRAW" | "AWAY",
  ) =>
    selections.some(
      (item) =>
        item.id === match._id &&
        item.market === market,
    );

  const markets = [
    {
      key: "HOME",
      label: "1",
      odd: match.homeOdd,
    },
    {
      key: "DRAW",
      label: "X",
      odd: match.drawOdd,
    },
    {
      key: "AWAY",
      label: "2",
      odd: match.awayOdd,
    },
  ] as const;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">

      {/* League */}

      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">
            {match.country}
          </p>

          <p className="text-sm text-slate-300">
            {match.league}
          </p>

        </div>

        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
          LIVE
        </span>

      </div>

      {/* Teams */}

      <div className="px-4 py-5">

        <div className="space-y-2">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold">
              {match.homeTeam}
            </h2>

          </div>

          <div className="text-slate-500">
            vs
          </div>

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold">
              {match.awayTeam}
            </h2>

          </div>

        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">

          <div className="flex items-center gap-1">

            <Calendar size={14} />

            {new Date(
              match.kickoff,
            ).toLocaleDateString()}

          </div>

          <div className="flex items-center gap-1">

            <Clock size={14} />

            {new Date(
              match.kickoff,
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </div>

        </div>

      </div>

      {/* Odds */}

      <div className="grid grid-cols-3 gap-2 border-t border-slate-800 p-3">

        {markets.map((market) => (

          <button
            key={market.key}
            onClick={() =>
              toggleSelection({
                id: match._id,
                home: match.homeTeam,
                away: match.awayTeam,
                market: market.key,
                odd: market.odd,
              })
            }
            className={`rounded-xl p-3 transition ${
              isSelected(market.key)
                ? "bg-green-600 text-white"
                : "bg-slate-800 hover:bg-green-600"
            }`}
          >

            <div className="text-xs text-slate-300">
              {market.label}
            </div>

            <div className="mt-1 text-lg font-bold">
              {market.odd.toFixed(2)}
            </div>

          </button>

        ))}

      </div>

    </div>
  );
}
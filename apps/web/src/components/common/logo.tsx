import { Trophy } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-green-600 p-2">
        <Trophy className="h-6 w-6 text-white" />
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-wide">
          BetPesa
        </h1>

        <p className="text-xs text-slate-400">
          Sportsbook
        </p>
      </div>
    </div>
  );
}
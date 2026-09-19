import MatchTable from "@/components/admin/matches/match-table";
import Link from "next/link";
export default function MatchesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Matches
          </h1>

          <p className="text-slate-400">
            Manage sportsbook matches
          </p>
        </div>

        <Link href="/admin/matches/new">
          <button className="rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-700">
            + New Match
          </button>
        </Link>
      </div>

      <MatchTable />
    </div>
  );
}
import MatchForm from "@/components/admin/matches/match-form";

export default function NewMatchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          New Match
        </h1>

        <p className="text-slate-400">
          Create a new sportsbook match
        </p>
      </div>

      <MatchForm />
    </div>
  );
}
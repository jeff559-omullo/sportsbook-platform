"use client";

import { useParams } from "next/navigation";

import MatchForm from "@/components/admin/matches/match-form";
import { useMatch } from "@/hooks/use-match";

export default function EditMatchPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: match,
    isLoading,
    error,
  } = useMatch(id);

  if (isLoading) {
    return (
      <div className="p-8">
        Loading match...
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="p-8 text-red-500">
        Match not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Match
        </h1>

        <p className="text-slate-400">
          Update match details
        </p>
      </div>

      <MatchForm
        mode="edit"
        match={match}
      />
    </div>
  );
}
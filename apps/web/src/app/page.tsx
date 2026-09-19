"use client";

import MainLayout from "@/components/layout/main-layout";
import Featured from "@/components/featured/featured";
import SportsNav from "@/components/sports/sports-nav";
import MatchCard from "@/components/matches/match-card";
import BetSlip from "@/components/betslip/betslip";

import { useMatches } from "@/hooks/use-matches";

export default function HomePage() {
  const {
    data: matches,
    isLoading,
    error,
  } = useMatches();

  return (
    <MainLayout betSlip={<BetSlip />}>

      <div className="space-y-5 px-3 sm:px-5 lg:px-0">

        <Featured />

        <SportsNav />


        {isLoading && (
          <div className="py-10 text-center text-slate-400">
            Loading matches...
          </div>
        )}


        {error && (
          <div className="py-10 text-center text-red-500">
            Failed to load matches.
          </div>
        )}


        {!isLoading && !error && (
          <div className="space-y-4 overflow-hidden">

            {matches?.length ? (

              matches.map((match) => (
                <MatchCard
                  key={match._id}
                  match={match}
                />
              ))

            ) : (

              <div className="py-10 text-center text-slate-400">
                No matches available.
              </div>

            )}

          </div>
        )}

      </div>

    </MainLayout>
  );
}
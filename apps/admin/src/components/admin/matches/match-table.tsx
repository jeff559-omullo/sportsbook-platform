"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useAdminMatches } from "@/hooks/use-admin-matches";
import DeleteDialog from "./delete-dialog";
import StatusBadge from "./status-badge";

export default function MatchTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const {
    data,
    isLoading,
    error,
  } = useAdminMatches();

  const filteredMatches = useMemo(() => {
    if (!data) return [];

    const keyword = search.trim().toLowerCase();

    return data.filter((match) => {
      const matchesSearch =
        match.homeTeam
          .toLowerCase()
          .includes(keyword) ||
        match.awayTeam
          .toLowerCase()
          .includes(keyword) ||
        match.league
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        status === "ALL" ||
        match.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [data, search, status]);

  if (isLoading) {
    return (
      <div className="rounded-xl bg-slate-900 p-8 text-center">
        Loading matches...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-900 p-8 text-center text-white">
        Failed to load matches.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="Search by team or league..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3 outline-none focus:border-blue-500"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border border-slate-700 bg-slate-900 p-3 outline-none focus:border-blue-500"
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="UPCOMING">
            Upcoming
          </option>

          <option value="LIVE">
            Live
          </option>

          <option value="FINISHED">
            Finished
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>
        </select>

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">
                Home
              </th>

              <th className="p-4 text-left">
                Away
              </th>

              <th className="p-4 text-left">
                League
              </th>

              <th className="p-4 text-left">
                Kickoff
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredMatches.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-slate-400"
                >
                  No matches found.
                </td>
              </tr>
            ) : (
              filteredMatches.map((match) => (
                <tr
                  key={match._id}
                  className="border-t border-slate-800 transition hover:bg-slate-800/40"
                >
                  <td className="p-4 font-medium">
                    {match.homeTeam}
                  </td>

                  <td className="p-4">
                    {match.awayTeam}
                  </td>

                  <td className="p-4">
                    {match.league}
                  </td>

                  <td className="p-4">
                    {new Date(
                      match.kickoff,
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={match.status}
                    />
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/admin/matches/${match._id}/edit`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <DeleteDialog
                        id={match._id}
                        homeTeam={match.homeTeam}
                        awayTeam={match.awayTeam}
                      />

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
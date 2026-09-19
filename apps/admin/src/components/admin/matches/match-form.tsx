"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateMatch } from "@/hooks/use-create-match";
import { useUpdateMatch } from "@/hooks/use-update-match";
import { Match } from "@/types/match";

interface MatchFormProps {
  mode?: "create" | "edit";
  match?: Match;
}

export default function MatchForm({
  mode = "create",
  match,
}: MatchFormProps) {
  const router = useRouter();

  const createMutation = useCreateMatch();
  const updateMutation = useUpdateMatch();

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;

  const [form, setForm] = useState({
    sport: "FOOTBALL",
    league: "",
    country: "",
    homeTeam: "",
    awayTeam: "",
    kickoff: "",
    homeOdd: 1.5,
    drawOdd: 3.2,
    awayOdd: 2.5,
  });

  useEffect(() => {
    if (mode === "edit" && match) {
      setForm({
        sport: match.sport,
        league: match.league,
        country: match.country,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        kickoff: match.kickoff.slice(0, 16),
        homeOdd: match.homeOdd,
        drawOdd: match.drawOdd,
        awayOdd: match.awayOdd,
      });
    }
  }, [mode, match]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name.includes("Odd")
        ? Number(value)
        : value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    if (mode === "edit" && match) {
      updateMutation.mutate(
        {
          id: match._id,
          data: form,
        },
        {
          onSuccess() {
            router.push("/admin/matches");
          },
        },
      );

      return;
    }

    createMutation.mutate(form, {
      onSuccess() {
        router.push("/admin/matches");
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-slate-900 p-8"
    >
      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="mb-2 block">
            Sport
          </label>

          <select
            name="sport"
            value={form.sport}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          >
            <option value="FOOTBALL">
              Football
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            League
          </label>

          <input
            name="league"
            value={form.league}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Country
          </label>

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Kickoff
          </label>

          <input
            type="datetime-local"
            name="kickoff"
            value={form.kickoff}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Home Team
          </label>

          <input
            name="homeTeam"
            value={form.homeTeam}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Away Team
          </label>

          <input
            name="awayTeam"
            value={form.awayTeam}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Home Odd
          </label>

          <input
            type="number"
            step="0.01"
            name="homeOdd"
            value={form.homeOdd}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Draw Odd
          </label>

          <input
            type="number"
            step="0.01"
            name="drawOdd"
            value={form.drawOdd}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Away Odd
          </label>

          <input
            type="number"
            step="0.01"
            name="awayOdd"
            value={form.awayOdd}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {isPending
          ? (mode === "edit"
              ? "Updating..."
              : "Saving...")
          : (mode === "edit"
              ? "Update Match"
              : "Save Match")}
      </button>
    </form>
  );
}
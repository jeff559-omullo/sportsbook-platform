"use client";

import { useState } from "react";

import { useDeleteMatch } from "@/hooks/use-delete-match";

interface Props {
  id: string;
  homeTeam: string;
  awayTeam: string;
}

export default function DeleteDialog({
  id,
  homeTeam,
  awayTeam,
}: Props) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } =
    useDeleteMatch();

  function handleDelete() {
    mutate(id, {
      onSuccess() {
        setOpen(false);
      },
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[420px] rounded-xl bg-white p-6 text-black shadow-xl">
            <h2 className="text-xl font-bold">
              Delete Match
            </h2>

            <p className="mt-4">
              Are you sure you want to delete
            </p>

            <p className="font-semibold mt-2">
              {homeTeam} vs {awayTeam}
            </p>

            <p className="mt-4 text-red-600">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded border px-4 py-2"
              >
                Cancel
              </button>

              <button
                disabled={isPending}
                onClick={handleDelete}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                {isPending
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
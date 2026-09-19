"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import matchesService from "@/services/admin/matches.service";

export function useCreateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: matchesService.createMatch,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-matches"],
      });
    },
  });
}
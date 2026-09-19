"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import matchesService from "@/services/admin/matches.service";

export function useDeleteMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      matchesService.deleteMatch(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-matches"],
      });
    },
  });
}
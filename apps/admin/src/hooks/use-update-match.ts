"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import matchesService from "@/services/admin/matches.service";
import { CreateMatchDto } from "@/types/match";

interface UpdateMatchPayload {
  id: string;
  data: Partial<CreateMatchDto>;
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateMatchPayload) =>
      matchesService.updateMatch(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-matches"],
      });
    },
  });
}
"use client";

import { useQuery } from "@tanstack/react-query";

import matchesService from "@/services/admin/matches.service";

export function useAdminMatches() {
  return useQuery({
    queryKey: ["admin-matches"],

    queryFn: () =>
      matchesService.getMatches(),
  });
}
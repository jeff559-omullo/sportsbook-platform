"use client";

import { useQuery } from "@tanstack/react-query";

import matchesService from "@/services/admin/matches.service";

export function useMatch(id: string) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => matchesService.getMatch(id),
    enabled: !!id,
  });
}
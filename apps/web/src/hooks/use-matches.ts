'use client';

import { useQuery } from '@tanstack/react-query';

import MatchesService from '@/services/matches.service';

export function useMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: () => MatchesService.getMatches(),
  });
}
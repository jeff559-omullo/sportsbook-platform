import api from "@/lib/api";
import { Match } from "@/types/match";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

class MatchesService {
  async getMatches(): Promise<Match[]> {
    const response = await api.get<ApiResponse<Match[]>>("/matches");

    return response.data.data;
  }

  async getMatch(id: string): Promise<Match> {
    const response = await api.get<ApiResponse<Match>>(`/matches/${id}`);

    return response.data.data;
  }
}

export default new MatchesService();
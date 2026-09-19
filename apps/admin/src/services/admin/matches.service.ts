import { api } from "@/lib/api";
import { Match, CreateMatchDto } from "@/types/match";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

class MatchesService {
  async getMatches(): Promise<Match[]> {
    const response =
      await api.get<ApiResponse<Match[]>>("/matches");

    return response.data.data;
  }

  async getMatch(id: string): Promise<Match> {
    const response =
      await api.get<ApiResponse<Match>>(
        `/matches/${id}`,
      );

    return response.data.data;
  }

  async createMatch(
    payload: CreateMatchDto,
  ): Promise<Match> {
    const response =
      await api.post<ApiResponse<Match>>(
        "/matches",
        payload,
      );

    return response.data.data;
  }

  async updateMatch(
    id: string,
    payload: Partial<CreateMatchDto>,
  ): Promise<Match> {
    const response =
      await api.patch<ApiResponse<Match>>(
        `/matches/${id}`,
        payload,
      );

    return response.data.data;
  }

  async deleteMatch(id: string) {
    return api.delete(`/matches/${id}`);
  }
}

export default new MatchesService();
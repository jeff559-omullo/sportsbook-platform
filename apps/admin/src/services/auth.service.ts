import { api } from "@/lib/api";

import {
  ApiResponse,
  AuthResponse,
  LoginDto,
} from "@/types/auth";

class AuthService {
  async login(
    payload: LoginDto,
  ): Promise<AuthResponse> {
    const response =
      await api.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        payload,
      );

    return response.data.data;
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  saveSession(data: AuthResponse) {
    localStorage.setItem(
      "accessToken",
      data.accessToken,
    );

    localStorage.setItem(
      "refreshToken",
      data.refreshToken,
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user),
    );
  }

  getAccessToken() {
    return localStorage.getItem(
      "accessToken",
    );
  }

  getUser() {
    const user =
      localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  }
}

export default new AuthService();
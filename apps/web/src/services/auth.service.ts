import { api } from "@/lib/api";

import {
  ApiResponse,
  AuthResponse,
  LoginDto,
  RegisterDto,
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

  async register(
    payload: RegisterDto,
  ): Promise<AuthResponse> {
    const response =
      await api.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        payload,
      );

    return response.data.data;
  }

  async me() {
    const response =
      await api.get<ApiResponse<user>>(
        "/auth/me",
      );

    return response.data.data;
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

  logout() {
    localStorage.clear();
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
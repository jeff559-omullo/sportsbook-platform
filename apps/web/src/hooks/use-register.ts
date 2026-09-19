"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export function useRegister() {
  return useMutation<
    RegisterResponse,
    Error,
    RegisterDto
  >({
    mutationFn: async (data) => {
      const response = await api.post<RegisterResponse>(
        "/auth/register",
        data
      );

      return response.data;
    },

    onSuccess(data) {
      if (data.accessToken) {
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );
      }
    },
  });
}
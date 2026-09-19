import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useLogin() {
  return useMutation({

    mutationFn: async (data:{
      phone:string;
      password:string;
    }) => {

      const res = await api.post(
        "/auth/login",
        data,
      );


      const auth =
        res.data.data;


      localStorage.setItem(
        "accessToken",
        auth.accessToken,
      );


      localStorage.setItem(
        "refreshToken",
        auth.refreshToken,
      );


      localStorage.setItem(
        "user",
        JSON.stringify(auth.user),
      );


      return auth;
    },

  });
}
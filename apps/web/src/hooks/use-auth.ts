"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoggedIn(false);
        setChecked(true);
        return;
      }

      try {
        await api.get("/auth/me");

        setLoggedIn(true);

      } catch {

        console.log("Invalid session");

        localStorage.removeItem("accessToken");

        setLoggedIn(false);
      }

      setChecked(true);
    }

    checkUser();

  }, []);

  return {
    loggedIn,
    checked,
  };
}
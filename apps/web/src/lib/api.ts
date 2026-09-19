import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://richmond-neck-derived-crucial.trycloudflare.com/api/v1",

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

console.log(
  "API URL:",
  process.env.NEXT_PUBLIC_API_URL ||
  "https://richmond-neck-derived-crucial.trycloudflare.com/api/v1"
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  console.log(
    "REQUEST:",
    config.method,
    config.url,
    token ? "HAS TOKEN" : "NO TOKEN"
  );

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
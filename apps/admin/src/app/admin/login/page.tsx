"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLogin } from "@/hooks/use-login";

export default function LoginPage() {
  const router = useRouter();

  const { mutate, isPending, error } =
    useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    mutate(form, {
      onSuccess() {
        router.push("/admin/dashboard");
      },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Admin Login
        </h1>

        <p className="mb-8 text-slate-400">
          Sign in to manage the sportsbook.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-green-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-600 p-3 text-white">
              Login failed.
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {isPending
              ? "Signing in..."
              : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
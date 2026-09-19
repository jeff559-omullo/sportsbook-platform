"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useRegister } from "@/hooks/use-register";

export default function RegisterPage() {
  const router = useRouter();

  const { mutate, isPending, error } =
    useRegister();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    mutate(
      {
        phone: form.phone,
        password: form.password,
      },
      {
        onSuccess() {
          router.push("/");
        },
      },
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join the sportsbook
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="254712345678"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-green-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-600 p-3 text-sm text-white">
              Registration failed.
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-500 disabled:opacity-60"
          >
            {isPending
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-500 hover:text-green-400"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
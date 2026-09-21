"use client";

// Admin login. Not linked from any public nav — reached only by typing the
// URL directly. On success, redirects into the dashboard shell.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, checkSession, getToken } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) return;
    checkSession()
      .then(() => router.replace("/interior-admin"))
      .catch(() => {});
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      router.replace("/interior-admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-olive px-5">
      <div className="w-full max-w-sm rounded-3xl border border-cream-100/15 bg-cream-100 p-8 sm:p-10">
        <p className="font-serif text-center text-2xl font-medium uppercase tracking-[0.4em] text-ink">
          Velor
        </p>
        <p className="eyebrow mt-2 text-center">Studio Admin</p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <div>
            <label className="eyebrow mb-2 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
              autoFocus
            />
          </div>
          <div>
            <label className="eyebrow mb-2 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="eyebrow h-13 w-full rounded-full bg-olive py-4 !tracking-[0.18em] !text-cream-100 transition hover:bg-olive-800 disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

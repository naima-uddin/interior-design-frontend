"use client";

// Client-side auth guard for the admin dashboard. Verifies the stored token
// against /api/auth/me on mount; redirects to the login page if missing or
// invalid. Renders nothing until the check resolves, to avoid a flash of
// protected content.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession, getToken, clearToken } from "@/lib/adminApi";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/interior-admin-login");
      return;
    }
    checkSession()
      .then(() => setReady(true))
      .catch(() => {
        clearToken();
        router.replace("/interior-admin-login");
      });
  }, [router]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <p className="eyebrow text-stone-400">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}

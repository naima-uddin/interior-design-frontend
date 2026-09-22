"use client";

// Left-hand nav for the admin dashboard — one link per resource, plus
// Dashboard/Media/Settings, a role-gated Team link, and a sign-out button.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RESOURCES } from "@/lib/adminResources";
import { logout, getStoredAdmin, type AdminInfo } from "@/lib/adminApi";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);

  useEffect(() => {
    setAdmin(getStoredAdmin());
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/interior-admin" ? pathname === href : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `block rounded-xl px-4 py-2.5 text-sm transition ${
      isActive(href)
        ? "bg-olive text-cream-100"
        : "text-ink/70 hover:bg-cream-200 hover:text-ink"
    }`;

  const signOut = async () => {
    await logout();
    router.replace("/interior-admin-login");
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-ink/10 bg-cream-100 p-5">
      <Link href="/interior-admin" className="mb-8 block px-1">
        <p className="font-serif text-xl font-medium uppercase tracking-[0.35em] text-ink">
          Velor
        </p>
        <p className="eyebrow mt-1 !text-[9px]">Studio Admin</p>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        <Link href="/interior-admin" className={linkClass("/interior-admin")}>
          Dashboard
        </Link>
        <Link href="/interior-admin/media" className={linkClass("/interior-admin/media")}>
          Media Library
        </Link>

        <p className="eyebrow mb-1 mt-5 px-4 !text-[9px] text-stone-400">Content</p>
        {RESOURCES.map((r) => (
          <Link
            key={r.key}
            href={`/interior-admin/${r.key}`}
            className={linkClass(`/interior-admin/${r.key}`)}
          >
            {r.label}
          </Link>
        ))}

        <p className="eyebrow mb-1 mt-5 px-4 !text-[9px] text-stone-400">Site</p>
        <Link href="/interior-admin/settings" className={linkClass("/interior-admin/settings")}>
          Settings
        </Link>
        <Link href="/interior-admin/before-after" className={linkClass("/interior-admin/before-after")}>
          Before / After
        </Link>
        {admin?.role === "admin" && (
          <Link href="/interior-admin/team" className={linkClass("/interior-admin/team")}>
            Team
          </Link>
        )}
      </nav>

      {admin && (
        <div className="mb-2 px-1">
          <p className="truncate text-xs font-medium text-ink/70">{admin.email}</p>
          <p className="eyebrow mt-0.5 !text-[9px] text-stone-400">{admin.role}</p>
        </div>
      )}
      <button
        onClick={signOut}
        className="eyebrow rounded-xl px-4 py-2.5 text-left text-red-500 transition hover:bg-red-50"
      >
        Sign out
      </button>
    </aside>
  );
}

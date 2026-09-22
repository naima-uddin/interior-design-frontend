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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAdmin(getStoredAdmin());
    setOpen(false);
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
    <>
      {/* Mobile top bar with hamburger */}
      <div className="flex h-14 items-center justify-between border-b border-ink/10 bg-cream-100 px-4 lg:hidden">
        <Link href="/interior-admin" className="block">
          <p className="font-serif text-base font-medium uppercase tracking-[0.3em] text-ink">
            Velor
          </p>
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg text-ink transition hover:bg-cream-200"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] shrink-0 -translate-x-full flex-col overflow-y-auto border-r border-ink/10 bg-cream-100 p-5 transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-1">
          <Link href="/interior-admin" className="block">
            <p className="font-serif text-xl font-medium uppercase tracking-[0.35em] text-ink">
              Velor
            </p>
            <p className="eyebrow mt-1 !text-[9px]">Studio Admin</p>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full text-ink/60 transition hover:bg-cream-200 lg:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

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
    </>
  );
}

"use client";

// Left-hand nav for the admin dashboard — one link per resource, plus
// Dashboard/Media/Settings, a role-gated Team link, and a sign-out button.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RESOURCES } from "@/lib/adminResources";
import { logout, getStoredAdmin, type AdminInfo } from "@/lib/adminApi";

type IconName =
  | "dashboard"
  | "media"
  | "banners"
  | "products"
  | "projects"
  | "services"
  | "posts"
  | "pages"
  | "testimonials"
  | "faqs"
  | "rooms"
  | "spaces"
  | "settings"
  | "info"
  | "compare"
  | "target"
  | "team";

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  media: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 17 4.8-5.2a1.6 1.6 0 0 1 2.3-.05L15 14.5m1.5-1.6.9-1a1.6 1.6 0 0 1 2.3 0L21 13" />
    </>
  ),
  banners: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h13.2c1 0 1.5 1.1.9 1.9L15.5 10l2.6 3.1c.6.8.1 1.9-.9 1.9H4" />
    </>
  ),
  products: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8 4.5L20 8M12 12.5V21" />
    </>
  ),
  projects: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 13 9 5 9-5" />
    </>
  ),
  services: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5v3M12 17.5v3M4.9 12h3M16.1 12h3" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  posts: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.8" />
      <path strokeLinecap="round" d="M8 8.5h8M8 12h8M8 15.5h5" />
    </>
  ),
  pages: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V8h4" />
    </>
  ),
  testimonials: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5h15a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.5 4V16a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
    </>
  ),
  faqs: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.6 9.3a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1 .9-1 1.7" />
      <circle cx="12" cy="16.3" r="0.15" fill="currentColor" stroke="none" />
    </>
  ),
  rooms: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 11 8-7 8 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10v9.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10" />
    </>
  ),
  spaces: (
    <>
      <rect x="3.5" y="4.5" width="8" height="8" rx="1.3" />
      <rect x="12.5" y="4.5" width="8" height="15" rx="1.3" />
      <rect x="3.5" y="14.5" width="8" height="5" rx="1.3" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 17.86a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H2.5a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.14 6.99a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09A1.7 1.7 0 0 0 9.63 1.09V1a2 2 0 1 1 4 0v.09c0 .68.4 1.29 1.04 1.56a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09c.27.64.88 1.05 1.56 1.05H21a2 2 0 1 1 0 4h-.09c-.68 0-1.29.4-1.56 1.05Z" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5" />
      <circle cx="12" cy="7.8" r="0.15" fill="currentColor" stroke="none" />
    </>
  ),
  compare: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v14M8 18l-3.5-3.5M8 18l3.5-3.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 20V6M16 6l3.5 3.5M16 6l-3.5 3.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  team: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19.5a6 6 0 0 1 12 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 5.2a3 3 0 0 1 0 5.8M18 19.5a5.8 5.8 0 0 0-3.3-5.2" />
    </>
  ),
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className ?? "h-4.5 w-4.5"}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      viewBox="0 0 24 24"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const RESOURCE_ICONS: Record<string, IconName> = {
  banners: "banners",
  products: "products",
  projects: "projects",
  services: "services",
  posts: "posts",
  pages: "pages",
  testimonials: "testimonials",
  faqs: "faqs",
  rooms: "rooms",
  spaces: "spaces",
};

function NavGroup({ label }: { label: string }) {
  return (
    <div className="mb-1.5 mt-6 flex items-center gap-2 px-3">
      <span className="eyebrow shrink-0 text-[9px]! text-stone-400">{label}</span>
      <span className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

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

  const signOut = async () => {
    await logout();
    router.replace("/interior-admin-login");
  };

  const NavLink = ({ href, icon, children }: { href: string; icon: IconName; children: React.ReactNode }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
          active
            ? "bg-olive text-cream-100 shadow-sm shadow-olive/30"
            : "text-ink/65 hover:bg-cream-200 hover:text-ink"
        }`}
      >
        {active && (
          <span className="absolute -left-5 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-olive" />
        )}
        <Icon
          name={icon}
          className={`h-4.5 w-4.5 shrink-0 transition ${
            active ? "text-cream-100" : "text-ink/40 group-hover:text-ink/70"
          }`}
        />
        <span className="truncate">{children}</span>
      </Link>
    );
  };

  const initial = (admin?.email?.[0] ?? "?").toUpperCase();

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div className="flex h-14 items-center justify-between border-b border-ink/10 bg-cream-100 px-4 lg:hidden">
        <Link href="/interior-admin" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-olive font-serif text-sm font-medium text-cream-100">
            V
          </span>
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
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] shrink-0 -translate-x-full flex-col border-r border-ink/10 bg-cream-100 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
          <Link href="/interior-admin" className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-olive font-serif text-base font-medium text-cream-100">
              V
            </span>
            <span>
              <p className="font-serif text-lg font-medium uppercase tracking-[0.3em] text-ink">
                Velor
              </p>
              <p className="eyebrow -mt-0.5 text-[9px]!">Studio Admin</p>
            </span>
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

        <nav className="flex-1 space-y-1 overflow-y-auto px-5 py-5">
          <NavLink href="/interior-admin" icon="dashboard">
            Dashboard
          </NavLink>
          <NavLink href="/interior-admin/media" icon="media">
            Media Library
          </NavLink>

          <NavGroup label="Content" />
          {RESOURCES.map((r) => (
            <NavLink key={r.key} href={`/interior-admin/${r.key}`} icon={RESOURCE_ICONS[r.key] ?? "pages"}>
              {r.label}
            </NavLink>
          ))}
          <NavLink href="/interior-admin/before-after" icon="compare">
            Before / After
          </NavLink>
          <NavLink href="/interior-admin/hotspot-scene" icon="target">
            Hotspot Scene
          </NavLink>

          <NavGroup label="Site" />
          <NavLink href="/interior-admin/info-control" icon="info">
            Info Control
          </NavLink>
          <NavLink href="/interior-admin/settings" icon="settings">
            Settings
          </NavLink>
          {admin?.role === "admin" && (
            <NavLink href="/interior-admin/team" icon="team">
              Team
            </NavLink>
          )}
        </nav>

        <div className="border-t border-ink/10 p-4">
          {admin && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-cream-200/60 px-3 py-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-olive/15 text-sm font-medium text-olive">
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-ink/80">{admin.email}</p>
                <p className="eyebrow mt-0.5 text-[9px]! text-stone-400">{admin.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={signOut}
            className="eyebrow flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-red-500 transition hover:bg-red-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

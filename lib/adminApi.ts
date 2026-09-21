"use client";

// Admin API client — talks to the Velor backend's protected endpoints using a
// bearer token kept in localStorage (simplest reliable option for a
// cross-port dev SPA; the backend also sets an httpOnly cookie as a backup).

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "velor_admin_token";
const ADMIN_KEY = "velor_admin_info";

export type Role = "admin" | "moderator";
export type AdminInfo = { email: string; name: string; role: Role };

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getStoredAdmin(): AdminInfo | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminInfo;
  } catch {
    return null;
  }
}

function setStoredAdmin(admin: AdminInfo) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function isAdminRole(): boolean {
  return getStoredAdmin()?.role === "admin";
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData)
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };
  const res = await fetch(`${API}${path}`, { ...options, headers, credentials: "include" });
  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/interior-admin-login";
    throw new ApiError("Not authenticated", 401);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || "Request failed", res.status);
  return data as T;
}

/* ── Auth ──────────────────────────────────────────────────────────────── */

export async function login(email: string, password: string) {
  const data = await request<{ token: string; admin: AdminInfo }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  setStoredAdmin(data.admin);
  return data.admin;
}

export async function logout() {
  clearToken();
  await request("/api/auth/logout", { method: "POST" }).catch(() => {});
}

export async function checkSession() {
  const data = await request<{ admin: AdminInfo & { id: string } }>("/api/auth/me");
  setStoredAdmin(data.admin);
  return data;
}

/* ── Generic resource CRUD ────────────────────────────────────────────── */

export function listAll<T = Record<string, unknown>>(resource: string) {
  return request<{ items: T[] }>(`/api/admin/${resource}`);
}

export function createItem<T = Record<string, unknown>>(resource: string, body: unknown) {
  return request<{ item: T }>(`/api/${resource}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateItem<T = Record<string, unknown>>(
  resource: string,
  id: string,
  body: unknown,
) {
  return request<{ item: T }>(`/api/${resource}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteItem(resource: string, id: string) {
  return request<{ ok: true }>(`/api/${resource}/${id}`, { method: "DELETE" });
}

export function getSettingsAdmin<T = Record<string, unknown>>() {
  return request<T>("/api/settings");
}

export function updateSettings<T = Record<string, unknown>>(body: unknown) {
  return request<{ item: T }>("/api/settings", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

/* ── Image upload ─────────────────────────────────────────────────────── */

export async function uploadImage(file: File, folder: string): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  form.append("folder", folder);
  const data = await request<{ url: string }>("/api/upload", {
    method: "POST",
    body: form,
  });
  return data.url;
}

/* ── Media library ─────────────────────────────────────────────────────── */

export type MediaItem = {
  publicId: string;
  url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  folder: string;
  createdAt: string;
};

export function listMedia(folder?: string, cursor?: string | null) {
  const params = new URLSearchParams();
  if (folder && folder !== "all") params.set("folder", folder);
  if (cursor) params.set("cursor", cursor);
  const qs = params.toString();
  return request<{ items: MediaItem[]; nextCursor: string | null }>(
    `/api/media${qs ? `?${qs}` : ""}`,
  );
}

export function deleteMedia(publicId: string) {
  return request<{ ok: true }>(`/api/media?publicId=${encodeURIComponent(publicId)}`, {
    method: "DELETE",
  });
}

/* ── Team (admin/moderator accounts) ─────────────────────────────────────── */

export type TeamMember = {
  _id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
};

export function listTeam() {
  return request<{ items: TeamMember[] }>("/api/team");
}

export function createTeamMember(body: {
  email: string;
  password: string;
  name: string;
  role: Role;
}) {
  return request<{ item: TeamMember }>("/api/team", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateTeamMember(
  id: string,
  body: Partial<{ name: string; role: Role; password: string }>,
) {
  return request<{ item: TeamMember }>(`/api/team/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteTeamMember(id: string) {
  return request<{ ok: true }>(`/api/team/${id}`, { method: "DELETE" });
}

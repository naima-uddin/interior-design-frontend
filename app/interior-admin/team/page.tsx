"use client";

// Team management — admin role only. Backend also enforces this (403 for
// moderators), this page just avoids showing the UI to accounts that can't
// use it and gives a friendly message if someone lands here directly.

import { useEffect, useState, useCallback } from "react";
import {
  getStoredAdmin,
  listTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  ApiError,
  type TeamMember,
  type Role,
} from "@/lib/adminApi";

export default function TeamPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ email: "", password: "", name: "", role: "moderator" as Role });
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await listTeam();
      setMembers(data.items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load team");
    }
  }, []);

  useEffect(() => {
    setIsAdmin(getStoredAdmin()?.role === "admin");
    load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      await createTeamMember(form);
      setForm({ email: "", password: "", name: "", role: "moderator" });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create account");
    } finally {
      setCreating(false);
    }
  };

  const changeRole = async (member: TeamMember, role: Role) => {
    try {
      await updateTeamMember(member._id, { role });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update role");
    }
  };

  const remove = async (member: TeamMember) => {
    if (!confirm(`Remove ${member.email}? They will lose access immediately.`)) return;
    try {
      await deleteTeamMember(member._id);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to remove account");
    }
  };

  if (isAdmin === false) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-cream-100 p-8">
        <p className="font-serif text-xl text-ink">Admins only</p>
        <p className="mt-2 text-sm text-stone-400">
          Your account doesn&apos;t have permission to manage the team.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-medium text-ink">Team</h1>
      <p className="mt-1.5 text-sm font-light text-stone">
        Admins have full access. Moderators can manage content and media, but not
        settings or the team.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Invite form */}
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-ink/10 bg-cream-100 p-6 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-2 block">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
          />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
          />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
          />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink focus:border-olive focus:outline-none"
          >
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={creating}
            className="eyebrow rounded-full bg-olive px-7 py-3.5 !tracking-[0.16em] !text-cream-100 transition hover:bg-olive-800 disabled:opacity-50"
          >
            {creating ? "Adding…" : "Add team member"}
          </button>
        </div>
      </form>

      {/* Member list */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-200 text-ink/60">
            <tr>
              <th className="px-4 py-3 font-normal"><span className="eyebrow">Member</span></th>
              <th className="w-36 px-4 py-3 font-normal"><span className="eyebrow">Role</span></th>
              <th className="w-24 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8 bg-cream">
            {!members && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-stone-400">Loading…</td></tr>
            )}
            {members?.map((m) => (
              <tr key={m._id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{m.name}</p>
                  <p className="text-xs text-stone-400">{m.email}</p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={m.role}
                    onChange={(e) => changeRole(m, e.target.value as Role)}
                    className="rounded-lg border border-ink/15 bg-cream px-2.5 py-1.5 text-xs text-ink focus:border-olive focus:outline-none"
                  >
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => remove(m)}
                    className="eyebrow text-red-400 transition hover:text-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex bg-cream">
        <AdminSidebar />
        <main className="min-h-screen flex-1 overflow-x-hidden p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}

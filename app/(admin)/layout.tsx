// app/(admin)/layout.tsx
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Fixed on the left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
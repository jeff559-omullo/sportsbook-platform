import { ReactNode } from "react";

import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
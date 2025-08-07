"use client";

import AdminHeader from "@/components/layout/AdminHeader";
import AdminSideBar from "@/components/layout/AdminSidebar";
import "@/styles/global.css";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* <AdminSideBar isOpen={sidebarOpen} />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 256 : 0 }}
      >
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen} />
        <main className="p-4 bg-gray-100 h-full overflow-y-auto">{children}</main>
      </div> */}
      <main className="p-4 bg-gray-100 h-full overflow-y-auto w-full">{children}</main>
    </div>
  );
}

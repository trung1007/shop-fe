"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

const ClientHeader = () => {
  const roles = useAppSelector((state) => state.auth.user?.roles);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stableRoles = useMemo(() => roles ?? [], [roles]);
  const hasAdminRole = stableRoles.some(
    (role: any) => role.name === "ROLE_ADMIN"
  );

  return hasAdminRole ? (
    <AdminHeader
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      isSidebarOpen={sidebarOpen}
    />
  ) : (
    <Header />
  );
};

export default ClientHeader;

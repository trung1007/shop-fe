"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/reduxHooks";
import Header from "./Header";

const ClientHeader = () => {
  const pathname = usePathname();
  const roles = useAppSelector((state) => state.auth.user?.roles);
  const isRedirecting = useAppSelector((state) => state.auth.isRedirecting);

  const stableRoles = useMemo(() => roles ?? [], [roles]);
  const hasAdminRole = stableRoles.some(
    (role: any) => role.name === "ROLE_ADMIN"
  );

  const isInAdminPath = pathname?.startsWith("/admin");

  if ((hasAdminRole && !isRedirecting) || isInAdminPath) return null;

  return <Header />;
};

export default ClientHeader;

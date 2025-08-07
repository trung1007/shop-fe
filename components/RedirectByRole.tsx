"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { setIsRedirecting } from "@/stores/auth/authSlice";

const RedirectByRole = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.auth.user?.roles);

  const stableRoles = useMemo(() => roles ?? [], [roles]);

  useEffect(() => {
    if (!stableRoles || stableRoles.length === 0) return;

    const hasAdminRole = stableRoles.some(
      (role: any) => role.name === "ROLE_ADMIN"
    );

    const isInAdminPath = pathname?.startsWith("/admin");

    if (hasAdminRole && !isInAdminPath) {
      dispatch(setIsRedirecting(true)); 
      router.replace("/admin");
    }
  }, [stableRoles, router, pathname, dispatch]);

  return null;
};

export default RedirectByRole;

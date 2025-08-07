"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const RedirectByRole = (pathname: any) => {
  const router = useRouter();
  const roles = useSelector((state: RootState) => state.auth.user?.roles);
  const [isChecking, setIsChecking] = useState(true);

  const stableRoles = useMemo(() => roles ?? [], [roles]);

  useEffect(() => {
    if (!stableRoles || stableRoles.length === 0) return;

    const hasAdminRole = stableRoles.some(
      (role: any) => role.name === "ROLE_ADMIN"
    );

    if (hasAdminRole) {
      router.replace("/admin");
      return;
    } else {
      setIsChecking(false);
    }

    console.log("pathname", pathname);
  }, [stableRoles, router]);

  return null;
};

export default RedirectByRole;

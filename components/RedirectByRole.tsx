"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const RedirectByRole = () => {
  const router = useRouter();
  const roles = useSelector((state: RootState) => state.auth.user?.roles);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!roles) return;

    const hasAdminRole = roles.some((role: any) => role.name === "ROLE_ADMIN");

    if (hasAdminRole) {
      router.replace("/admin");
      return;
    } else {
      setIsChecking(false);
    }
  }, [roles, router]);

  return null;
};

export default RedirectByRole;

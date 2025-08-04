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
    // Nếu roles chưa load xong, thì chờ
    if (!roles) return;

    const hasAdminRole = roles.some((role: any) => role.name === "ROLE_ADMIN");

    if (hasAdminRole) {
      router.replace("/admin");
      return;
    } else {
      setIsChecking(false); // Không phải admin thì thôi, render UI thường
    }
  }, [roles, router]);

//   if (isChecking) {
//     return (
//       <div className="w-screen h-screen flex justify-center items-center">
//         <p>Đang kiểm tra quyền truy cập...</p>
//       </div>
//     );
//   }

  return null;
};

export default RedirectByRole;

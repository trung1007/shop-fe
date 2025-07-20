"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/stores/auth/authSlice";
import Cookies from "js-cookie";

const UserInfoPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user && !isLoggingOut) {
      router.push("/login");
    }
  }, [user, isLoggingOut, router]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("access_token");
    dispatch(logout());

    setTimeout(() => {
      router.push("/login");
    }, 1000); // Cho user thấy hiệu ứng
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10">
      {isLoggingOut ? (
        <div className="text-center text-lg font-medium text-gray-500">
          Đang đăng xuất...
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Thông tin người dùng</h1>
          <p>
            <strong>Họ tên:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            Đăng xuất
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfoPage;

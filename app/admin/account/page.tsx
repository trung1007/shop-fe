"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "@/stores/auth/authSlice";

const AdminAccountPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token");
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Thông tin tài khoản</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Họ và tên</label>
          <input
            type="text"
            value={user?.name || ""}
            disabled
            className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Số điện thoại</label>
          <input
            type="text"
            value={user?.phone || ""}
            disabled
            className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
          />
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminAccountPage;

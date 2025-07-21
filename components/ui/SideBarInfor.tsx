"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/stores/auth/authSlice";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaHeart,
  FaLock,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const SideBarInfor = ({ handleLogout }: any) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter()
  const pathname = usePathname();

  const menuItems = [
    { path: "/user", icon: <FaUser />, label: "Thông tin khách hàng" },
    { path: "/orders", icon: <FaShoppingBag />, label: "Đơn hàng của bạn" },
    { path: "/user/change-pass", icon: <FaLock />, label: "Đổi mật khẩu" },
    { path: "/favorites", icon: <FaHeart />, label: "Sản phẩm yêu thích" },
  ];
  return (
    <aside className="w-full md:w-1/4 bg-white p-4 rounded shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <p className="mt-2 font-semibold">{user?.name}</p>
        <button className="text-sm text-blue-600 hover:underline mt-1">
          Sửa ảnh đại diện
        </button>
      </div>
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-2 text-left w-full p-2 rounded 
          hover:bg-gray-100 ${pathname === item.path ? "bg-[#e4e7ec]" : ""
              }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-left w-full hover:bg-red-100 text-red-600 p-2 rounded"
        >
          <FaSignOutAlt /> Đăng xuất
        </button>
      </nav>
    </aside>
  );
};

export default SideBarInfor;

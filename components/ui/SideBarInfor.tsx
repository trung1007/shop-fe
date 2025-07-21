"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/stores/auth/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaHeart,
  FaLock,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const SideBarInfor = ({handleLogout}:any) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter()
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
        <button className="flex items-center gap-2 text-left w-full font-medium bg-gray-100 p-2 rounded" onClick={()=>{router.push("/user")}} >
          <FaUser /> Thông tin khách hàng
        </button>
        <button className="flex items-center gap-2 text-left w-full hover:bg-gray-100 p-2 rounded">
          <FaShoppingBag /> Đơn hàng của bạn
        </button>
        <button className="flex items-center gap-2 text-left w-full hover:bg-gray-100 p-2 rounded">
          <FaLock /> Đổi mật khẩu
        </button>
        <button className="flex items-center gap-2 text-left w-full hover:bg-gray-100 p-2 rounded">
          <FaHeart /> Sản phẩm yêu thích
        </button>
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

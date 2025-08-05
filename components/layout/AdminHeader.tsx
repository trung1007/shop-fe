"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineArrowLeft } from "react-icons/hi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }: AdminHeaderProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleAccountClick = () => {
    const token = Cookies.get("access_token");
    token ? router.push("/admin/account") : router.push("/login");
  };

  const handleLogoClick = () => {
    router.push("/admin");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-white transition-transform duration-300 transform hover:scale-110"
        >
          {isSidebarOpen ? (
            <HiOutlineArrowLeft size={24} />
          ) : (
            <HiOutlineMenu size={24} />
          )}
        </button>
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={handleLogoClick}
        >
          Admin Dashboard
        </h1>
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleAccountClick}
      >
        <div className="p-2 rounded-[8px] border border-gray-300">
          <FaRegUserCircle size={20} />
        </div>
        {user ? (
          <span className="font-medium text-[16px]">{user.name}</span>
        ) : (
          <div className="flex flex-col">
            <span className="text-xs">Tài khoản</span>
            <span className="font-semibold">Đăng nhập</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;

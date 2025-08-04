"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleClick = () => {
    const token = Cookies.get("access_token");
    token ? router.push("/admin/account") : router.push("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      {user ? (
        <div
          className="user flex gap-2 items-center  p-2 rounded cursor-pointer"
          onClick={handleClick}
        >
          <div className="p-2 rounded-[8px] border border-gray-300 ">
            <FaRegUserCircle size={20} />
          </div>
          <span className="font-medium text-[16px] block">{user?.name}</span>
        </div>
      ) : (
        <div
          className="user flex gap-2 items-center  p-2 rounded cursor-pointer"
          onClick={handleClick}
        >
          <div className="p-2 rounded-[8px] border border-gray-300 ">
            <FaRegUserCircle size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs">Tài khoản</span>
            <span className="font-semibold block">Đăng nhập</span>
          </div>
        </div>
      )}
    </header>
  );
};
export default AdminHeader;

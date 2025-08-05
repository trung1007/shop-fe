"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaUsers, FaCog } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const AdminSideBar = ({ isOpen }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Menu
      </div>
      <nav className="flex flex-col p-4 gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${
              pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSideBar;

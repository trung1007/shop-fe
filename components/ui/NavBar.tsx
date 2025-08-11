"use client";

import { FiMenu, FiSearch, FiPhone, FiShoppingCart } from "react-icons/fi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { useState } from "react";
import HoverDropdown, { HoverDropdownOption } from "../common/HoverDropdown";
import Link from "next/link";
import CartModal from "../modal/CartModal";

const contactOptions: HoverDropdownOption[] = [
  {
    label: "Liên hệ Message",
    value: "/",
    icon: FaFacebookMessenger,
    styleIcon: "text-blue-600 mr-2 text-base",
  },
  {
    label: "Liên hệ Zalo",
    value: "/",
    icon: SiZalo,
    styleIcon: "text-blue-600 mr-2 text-2xl",
  },
];

const NavBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const categoryOptions: HoverDropdownOption[] = [
    { label: "Công nghệ", value: "tech" },
    { label: "Kinh doanh", value: "business" },
    { label: "Sức khỏe", value: "health" },
    { label: "Giáo dục", value: "education" },
  ];

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-between px-40 py-2 bg-white shadow">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold text-gray-700">
            <img
              src="/images/logo-shop.png"
              height={80}
              width={100}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Nút Danh Mục */}
        <HoverDropdown
          label="DANH MỤC"
          options={categoryOptions}
          icon={FiMenu}
          style="flex items-center px-3 rounded-lg py-3 bg-emerald-500 hover:bg-emerald-600 text-white"
        />

        {/* Thanh Tìm Kiếm */}
        <div className="flex items-center rounded-lg px-4 py-2 w-1/3 transition-shadow bg-white full-shadow">
          <FiSearch className="text-gray-500 mr-3 text-3xl" />
          <input
            type="text"
            placeholder="Bạn cần tìm gì?"
            className="w-full bg-transparent text-base focus:outline-none placeholder-gray-400"
          />
        </div>

        {/* Hotline */}
        <div className="flex items-start space-x-2 text-emerald-600">
          <FiPhone className="text-4xl mt-1" />
          <div className="flex flex-col leading-tight">
            <div className="text-xm text-black font-normal">Hotline</div>
            <div className="text-lg font-bold text-emerald-600">
              0123.456.789
            </div>
          </div>
        </div>

        {/* Tư vấn trực tiếp */}
        <HoverDropdown
          label="Tư vấn trực tiếp"
          options={contactOptions}
          icon={BsFillLightningChargeFill}
          style="flex items-center space-x-1 text-gray-700 cursor-pointer"
          iconStyle="text-4xl text-emerald-500"
          dropdownWidth="w-42"
        />

        {/* Giỏ hàng */}
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center px-5 py-2 border rounded-lg hover:bg-emerald-50 border-emerald-600 text-black"
          >
            <FiShoppingCart className="mr-2 text-4xl text-emerald-600" />
            Giỏ hàng
          </button>
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </div>
      </div>

      {/* Modal giỏ hàng */}
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavBar;

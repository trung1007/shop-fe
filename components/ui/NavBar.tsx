"use client";

import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { FiMenu, FiSearch, FiPhone, FiShoppingCart } from 'react-icons/fi';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import '../../styles/navbar.css'

type FormValues = {
  search: string;
  category: string;
};
const categories = [
  "Danh mục sản phẩm",
  "Bàn phím cơ",
  "Chuột & lót chuột",
  "Tai nghe",
];

const NavBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      search: "",
      category: categories[0], // default là "Danh mục sản phẩm"
    },
  });

  const [showDropdownCategory, setShowDropdownCategory] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log("Search:", data.search);
    console.log("Category:", data.category);
    // onSearch(data.search, data.category);
    reset();
  };

  return (
    <div className="flex items-center justify-between px-40 py-2 bg-white shadow">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-gray-700">
          <img
              src="/images/logo-shop.png"
              height={80}
              width={100}
              className="cursor-pointer"
            />
        </div>
      </div>

      {/* Nút Danh Mục */}
<div className="relative group inline-block">
  <button className="flex items-center px-3 rounded-lg py-3 bg-emerald-500 text-white hover:bg-emerald-600">
    <FiMenu className="mr-2" />
    DANH MỤC
  </button>

  {/* Dropdown menu */}
  <div className="absolute left-0 mt-1 w-48 bg-white full-shadow rounded-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity z-50">
    <ul className="py-2 text-gray-700">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Danh mục 1</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Danh mục 2</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Danh mục 3</li>
    </ul>
  </div>
</div>

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
          <div className="text-lg font-bold text-emerald-600">0349.296.461</div>
        </div>
      </div>

      {/* Tư vấn trực tiếp */}
      <div className="relative group inline-block">
        <div className="flex items-center space-x-1 text-gray-700 cursor-pointer">
          <BsFillLightningChargeFill className="text-4xl text-emerald-500" />
          <span className="text-xm">Tư vấn trực tiếp</span>
        </div>

        {/* Dropdown */}
        <div className="absolute left-0 mt-2 w-48 bg-white rounded full-shadow opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-10">
          <a
            href="https://m.me/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaFacebookMessenger className="text-blue-600 mr-2 text-base" />
            Liên hệ Messenger
          </a>
          <a
            href="https://zalo.me/yourzaloid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <SiZalo className="text-blue-600 mr-2 text-2xl" />
            Liên hệ Zalo
          </a>
        </div>
      </div>

      {/* Giỏ hàng */}
      <div className="relative">
        <button className="flex items-center px-5 py-2 border rounded-lg hover:bg-emerald-50 border-emerald-600 text-black">
          <FiShoppingCart className="mr-2 text-4xl text-emerald-600" />
          Giỏ hàng
        </button>
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          1
        </span>
      </div>
    </div>
  );
};

export default NavBar;

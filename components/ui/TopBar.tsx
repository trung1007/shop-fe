// TopBar.tsx
import React from "react";
import {
  FaMapMarkerAlt,
  FaHeadphonesAlt,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaUser,
} from "react-icons/fa";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { SiShopee, SiTiktok } from "react-icons/si";
import Link from 'next/link';

const TopBar = () => {
    return (
    <div className="bg-emerald-600 text-white text-sm py-2 px-40 flex items-center justify-between">
      <div className="flex space-x-2 items-center">
        <div className="flex items-center bg-lime-200 text-emerald-900 rounded-full px-3 py-1 font-medium">
          <FaMapMarkerAlt className="mr-1" />
          Địa chỉ liên hệ
        </div>
        <div className="flex items-center bg-lime-200 text-emerald-900 rounded-full px-3 py-1 font-medium">
          <FaHeadphonesAlt className="mr-1" />
          Hotline trực tuyến
        </div>
      </div>

      <div className="flex space-x-4 items-center text-white text-base">
        <Link href="#" className="hover:text-gray-200 flex items-center"><SiShopee /> <span className="ml-1 hidden md:inline">Shopee</span></Link>
        <Link href="#" className="hover:text-gray-200 flex items-center"><FaInstagram /> <span className="ml-1 hidden md:inline">Instagram</span></Link>
        <Link href="#" className="hover:text-gray-200 flex items-center"><SiTiktok /> <span className="ml-1 hidden md:inline">Tiktok</span></Link>
        <Link href="#" className="hover:text-gray-200 flex items-center"><FaYoutube /> <span className="ml-1 hidden md:inline">Youtube</span></Link>
        <Link href="#" className="hover:text-gray-200 flex items-center"><FaFacebookF /> <span className="ml-1 hidden md:inline">Facebook</span></Link>
      </div>

      <div className="flex space-x-4 items-center text-white">
        <Link href="#" className="flex items-center hover:text-gray-200">
          <BsFillMegaphoneFill className="mr-1" />
          Tin tức
        </Link>
        <Link href="/login" className="flex items-center hover:text-gray-200 cursor-pointer">
          <FaUser className="mr-1" />
          Đăng ký / Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

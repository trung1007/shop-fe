"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub, FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import SearchInput from "../ui/SearchInput";
// import MenuBar from "../ui/MenuBar";

const Header = () => {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null); // Ref
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight =
        headerRef.current?.getBoundingClientRect().height || 0;
      const headerTop = headerRef.current?.offsetTop || 0;
      const triggerPoint = headerTop + headerHeight;

      setIsSticky(window.scrollY >= triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const token = Cookies.get("access_token");
    token ? router.push("/user") : router.push("/login");
  };

  const onLogoReload = () => router.push("/");

  return (
    <>
      {isSticky && <div className="h-[64px]" />}

      <header
        ref={headerRef}
        className={`header-wrapper py-4 w-full flex flex-col transition-all duration-500 ease-in-out ${
          isSticky
            ? "fixed top-0 left-0 z-50 bg-white shadow-md"
            : "relative bg-transparent"
        }`}
      >
        <div className="header-container h-[48px] w-full px-[64px] grid grid-cols-[3fr_6fr_3fr] items-center">
          <div className="header-logo flex justify-center items-center">
            <img
              src="https://bizweb.dktcdn.net/100/502/483/themes/1011801/assets/logo.png?1748850004905"
              alt="Logo T&D"
              height={80}
              width={120}
              onClick={onLogoReload}
              className="cursor-pointer"
            />
          </div>
          <SearchInput onSearch={(val) => {}} />

          <div className="header-func min-w-[20%] h-8 flex gap-3 justify-end items-center">
            <div className="user flex gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
              <div className="p-2 rounded-[8px] border border-gray-300 ">
                <FaRegUserCircle size={20} onClick={handleClick} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Tài khoản</span>
                <span className="font-semibold block">Đăng nhập</span>
              </div>
            </div>
            <div className="cart flex gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
              <div className="p-2 rounded-[8px] border border-gray-300 ">
                <FiShoppingCart size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Giỏ hàng</span>
                <span className="font-semibold block">0 sản phẩm</span>
              </div>
            </div>
          </div>
        </div>

        {/* <MenuBar /> */}
      </header>
    </>
  );
};

export default Header;

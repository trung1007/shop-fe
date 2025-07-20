"use client";
import Image from "next/image"
import LogoShop from "@/public/images/logo.svg"
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import SearchInput from "../ui/SearchInput";
import MenuBar from "../ui/MenuBar";
import Cookies from "js-cookie";
const Header = () => {

    const router = useRouter();

    const handleClick = () => {

        const token = Cookies.get("access_token");
        if (token) {
            router.push("/user")
        }
        else {
            router.push("/login");
        }
    };

    const onLogoReload = () => {
        router.push("/")
    }

    return (
        <header className="header-wrapper h-[120px] w-full flex flex-col relative">
            <div className="header-container h-[94px] w-full px-[32px] flex items-center border-b-1 border-b-gray-300" >
                <div className="header-contact min-w-[20%] h-8 flex gap-3 justify-start ">
                    <a href="https://www.facebook.com/trungtc1007/" className="icon-contact hover:ring-1 hover:ring-gray-300 rounded-full p-2 transition-all duration-200"><BsFacebook size={20} /></a>
                    <a href="https://www.instagram.com/_cttrung_/" className="icon-contact hover:ring-1 hover:ring-gray-300 rounded-full p-2 transition-all duration-200"><FaInstagram size={20} /></a>
                    <a href="https://github.com/trung1007" className="icon-contact hover:ring-1 hover:ring-gray-300 rounded-full p-2 transition-all duration-200"><FaGithub size={20} /></a>
                </div>
                <div className="header-logo flex-1 flex justify-center items-center">
                    <div>
                        <Image src={LogoShop.src} alt="Logo T&D" height={80} width={120} onClick={onLogoReload} />
                    </div>

                </div>
                <div className="header-func min-w-[20%] h-8 flex gap-2 justify-end items-center ">
                    <div>
                        <SearchInput onSearch={(val) => { }} />
                    </div>
                    <div className="icon-user hover:ring-1 hover:ring-gray-300 rounded-full p-2 transition-all duration-200">
                        <FaRegUserCircle size={20} onClick={handleClick} />
                    </div>
                    <div className="hover:ring-1 hover:ring-gray-300 rounded-full p-2 transition-all duration-200">
                        <FaRegHeart />
                    </div>
                    <div className="hover:ring-1 hover:ring-gray-300 rounded-full p-2 transition-all duration-200">
                        <FiShoppingCart />
                    </div>
                </div>
            </div>
            <MenuBar />

        </header>
    )
}

export default Header

"use client";

import { Menu } from "antd";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

const MenuItem = [
    {
        key: "1",
        label: "Trang chủ",
        route: "/",
        children: [],
    },
    {
        key: "2",
        label: "Sản phẩm",
        route: "/product",
        children: [],
    },
    {
        key: "3",
        label: "New Arrivals",
        route: "/product/new",
        children: [],
    },
    {
        key: "4",
        label: "Áo nam",
        route: "/product/shirt",
        children: [],
    },
    {
        key: "5",
        label: "Quần nam",
        route: "/product/pants",
        children: [],
    },
    {
        key: "6",
        label: "Phụ kiện",
        route: "/product/accessories",
        children: [],
    },
    {
        key: "7",
        label: "Về T&D",
        route: "/about",
        children: [],
    },
];
const MenuBar = () => {
    const router = useRouter();

    const handleClick = (route: string) => {
        router.push(route);
    };
    return (
        <nav className="w-full h-[48px] px-[32px] flex items-center justify-center bg-[#ed1927]">
            <ul className="flex h-full items-center gap-6">
                {MenuItem.map((item) => (
                    <li
                        key={item.key}
                        onClick={() => handleClick(item.route)}
                        className="cursor-pointer"
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MenuBar
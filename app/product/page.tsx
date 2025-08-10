"use client"
import BreadCrumb from "@/components/common/BreadCrumb";
import ListCollection from "@/components/ui/ListCollection";
import ProductCard from "@/components/ui/ProductCard"
import { Divider } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Product = () => {
    // Giả sử đây là danh sách 13 sản phẩm (có thể là dữ liệu thật từ API)
    const products = Array.from({ length: 13 }, (_, index) => ({
        id: index + 1,
        name: `Sản phẩm ${index + 1}`,
    }));
    const sortOptions = [
        "Tên A → Z",
        "Tên Z → A",
        "Giá tăng dần",
        "Giá giảm dần",
        "Mới nhất"
    ];

    const colors = ["Trắng", "Đen", "Xám", "Xanh dương", "Đỏ"];
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="flex flex-col px-[64px] pb-[60px] pt-[20px] gap-6 bg-[var(--color-bg)]">
            <div>
                <BreadCrumb
                    items={[
                        { label: "Trang chủ", href: "/" },
                        { label: "Sản phẩm", href: "/product" },
                        { label: "Sản phẩm nổi bật" } // Không có href => là mục hiện tại
                    ]}
                />
            </div>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-white p-4">
                        {/* Tiêu đề */}
                        <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                            Tai nghe
                        </h2>

                        {/* Nút lọc */}
                        <div className="flex items-center gap-2">
                            {sortOptions.map((option, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 font-semibold  "
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {products.map((product) => (
                            <ProductCard />
                        ))}
                    </div>
                </div>
                <div className="col-span-1 bg-white p-4 flex flex-col h-fit">
                    <div>
                        <h3 className="font-semibold mb-3">Màu sắc</h3>

                        <div className="flex flex-col gap-2">
                            {colors.map((color, index) => (
                                <label key={index} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                                    {color}
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="mt-3 text-blue-600 flex items-center gap-1 text-sm hover:underline"
                        >
                            Xem thêm
                            <FaChevronDown
                                className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                    <Divider />

                    <div>
                        <h3 className="font-semibold mb-3">Màu sắc</h3>

                        <div className="flex flex-col gap-2">
                            {colors.map((color, index) => (
                                <label key={index} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                                    {color}
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="mt-3 text-blue-600 flex items-center gap-1 text-sm hover:underline"
                        >
                            Xem thêm
                            <FaChevronDown
                                className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                    <Divider />
                    <div>
                        <h3 className="font-semibold mb-3">Màu sắc</h3>

                        <div className="flex flex-col gap-2">
                            {colors.map((color, index) => (
                                <label key={index} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                                    {color}
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="mt-3 text-blue-600 flex items-center gap-1 text-sm hover:underline"
                        >
                            Xem thêm
                            <FaChevronDown
                                className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                    <Divider />
                    <div>
                        <h3 className="font-semibold mb-3">Màu sắc</h3>

                        <div className="flex flex-col gap-2">
                            {colors.map((color, index) => (
                                <label key={index} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                                    {color}
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="mt-3 text-blue-600 flex items-center gap-1 text-sm hover:underline"
                        >
                            Xem thêm
                            <FaChevronDown
                                className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>

                </div>
            </div>

            <ListCollection/>
        </div>
    )
}

export default Product

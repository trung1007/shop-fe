"use client"
import BreadCrumb from "@/components/common/BreadCrumb";
import ListCollection from "@/components/ui/ListCollection";
import ProductCard from "@/components/ui/ProductCard"
import ProductCardTmp from "@/components/ui/ProductCardTmp";
import { ProductType, ProductTypeTitle } from "@/const/enum";
import { FilterOperator } from "@/constants/FilterOperator";
import useCommonRepository from "@/hooks/useCommonRepository";
import useProduct from "@/hooks/useProduct";
import useQueryClient from "@/hooks/useProduct";
import { getAllProducts } from "@/services/productService";
import { Divider } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type Product = {
    id: number;
    name: string;
    price: number;
    // thêm field khác...
};

const FILTER_OPERATORS = {
    "categoryId": FilterOperator.EQUALITY,
    "subCategoryId": FilterOperator.EQUALITY
}

const Product = () => {

    // const searchParams = useSearchParams();
    // const typeParam = searchParams.get("type") as ProductType | null;
    // const type = typeParam?.toUpperCase() as keyof typeof ProductType;

    const [filter, setFilter] = useState({
        categoryId: null,
        subCategoryId: null
    })

    // const productTitle =
    //     type && ProductTypeTitle[type]
    //         ? ProductTypeTitle[type]
    //         : "Không xác định";

    const sortOptions: { label: string; field: string; order: "ascending" | "descending" }[] = [
        { label: "Tên A → Z", field: "name", order: "ascending" },
        { label: "Tên Z → A", field: "name", order: "descending" },
        { label: "Giá tăng dần", field: "price", order: "ascending" },
        { label: "Giá giảm dần", field: "price", order: "descending" },
        { label: "Mới nhất", field: "createdAt", order: "descending" }
    ];

    const {
        records: products,
        fetching,
        sortField
    } = useProduct<Product>(getAllProducts);
    // const {
    //     records: products,
    //     fetching,
    //     sortField
    // } = useCommonRepository<Product>(getAllProducts)



    const colors = ["Trắng", "Đen", "Xám", "Xanh dương", "Đỏ"];
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="flex flex-col pb-[60px] pt-[20px] gap-6 bg-[var(--color-bg)]">
            <div>
                <BreadCrumb
                    items={[
                        { label: "Trang chủ", href: "/" },
                        { label: "Sản phẩm", href: "/product" },
                        { label: '11111' }
                    ]}
                />
            </div>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-white p-4">
                        {/* Tiêu đề */}
                        <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                            {/* {productTitle} */}
                            1111
                        </h2>

                        {/* Nút lọc */}
                        <div className="flex items-center gap-2">
                            {sortOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => sortField({ value: option.field, order: option.order })}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 font-semibold"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 font-semibold">all</button>
                            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 font-semibold">categoryId=6(cong nghe)</button>
                            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 font-semibold">subCategoryId=6(laptop)</button>

                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {products.map((product) => (
                            <ProductCardTmp key={JSON.stringify(product)} product={product} />
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

            <ListCollection />
        </div>
    )
}

export default Product

"use client"
import BreadCrumb from "@/components/common/BreadCrumb";
import ListCollection from "@/components/ui/ListCollection";
import ProductCard from "@/components/ui/ProductCard"
import ProductCardTmp from "@/components/ui/ProductCardTmp";
import { ProductCategory } from "@/const/enum";
import { FilterOperator } from "@/constants/FilterOperator";
import useCommonRepository from "@/hooks/useCommonRepository";
import useProduct from "@/hooks/useProduct";
import useQueryClient from "@/hooks/useProduct";
import { getAllProducts } from "@/services/productService";
import { toSearchParam } from "@/utils/requestUtil";
import { Divider } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from 'next/link';


type Product = {
    id: number;
    name: string;
    price: number;
    // thêm field khác...
};

const FILTER_OPERATORS = {
    "category": FilterOperator.EQUALITY,
    "subCategory": FilterOperator.EQUALITY
}

const PRODUCT_LIST_PATH = "/products";

const Product = () => {
    const pathName = usePathname();
    let breadcrumbDefault = [{ label: "Trang chủ", href: "/" }]

    const paths = pathName.replace(PRODUCT_LIST_PATH, "").split("/").filter(Boolean);
    //need handle paths has more than 2
    if (paths.length === 0) {
        breadcrumbDefault.push({ label: "Tất cả sản phẩm", href: "/products" })
    } else {
        let breadcrumbPath = "/products";
        paths.forEach(path => {
            breadcrumbPath += `/${path}`
            breadcrumbDefault.push({
                label: ProductCategory[path],
                href: breadcrumbPath
            })
        })
    }

    const ProductCategoryTitle = breadcrumbDefault.at(breadcrumbDefault.length - 1)

    const optionQueryCategory = paths.length === 2 ? "subCategory" : "category";

    const [filter, setFilter] = useState({
        code: null,
        category: {
            option: optionQueryCategory,
            value: paths.at(paths.length - 1)?.toString(),
        },
    })

    const sortOptions: { label: string; field: string; order: "ascending" | "descending" }[] = [
        { label: "Tên A → Z", field: "name", order: "ascending" },
        { label: "Tên Z → A", field: "name", order: "descending" },
        { label: "Giá tăng dần", field: "price", order: "ascending" },
        { label: "Giá giảm dần", field: "price", order: "descending" },
        { label: "Mới nhất", field: "createdAt", order: "descending" }
    ];

    const searchKey = toSearchParam(filter, FILTER_OPERATORS);

    const {
        records: products,
        fetching,
        sortField,
        serverParams,
        fetchRecords
    } = useProduct<Product>(getAllProducts, "getListsProductByFilter", filter, searchKey);

    useEffect(() => {
        console.log("products", products);

    }, [products])



    // const {
    //     records: products,
    //     fetching,
    //     sortField
    // } = useCommonRepository<Product>(getAllProducts)

    const onFilterChange = (fieldType: any, value: any) => {
        const newFilter = {
            ...filter,
            [fieldType]: value
        }
        setFilter(newFilter);
        serverParams.searchKey = toSearchParam(newFilter, FILTER_OPERATORS);
    }


    const colors = ["Trắng", "Đen", "Xám", "Xanh dương", "Đỏ"];
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="flex flex-col pb-[60px] pt-[20px] gap-6 bg-[var(--color-bg)]">
            <div>
                <BreadCrumb
                    items={breadcrumbDefault}
                />
            </div>
            <div className="grid grid-cols-4 gap-5">
                <div className="col-span-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-white p-4">
                        {/* Tiêu đề */}
                        <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                            {ProductCategoryTitle?.label}
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
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {(products || []).map((product: any) => (
                            <ProductCard key={product.id} product={product} />
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

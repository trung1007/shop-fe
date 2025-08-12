"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { FaAngleRight } from "react-icons/fa";
import useCommonRepository from "@/hooks/useCommonRepository";
import { getAllProducts } from "@/services/productService";

const GroupProduct = ({ groupTitle }: any) => {

    const {
        records,
        totalRecords,
        fetching,
        fetchRecords,
        onParamsChange,
        sortField,
    } = useCommonRepository(getAllProducts)

    console.log(records)
    return (
        <div className="group-product flex flex-col gap-2 w-full px-[64px] mt-[60px] ">
            <div className="w-full bg-[white] flex items-center justify-between px-5 py-3 rounded-[8px] " >
                <h2 className="text-[24px] text-[var(--color-primary)] font-bold ">{groupTitle}</h2>
                <div className="flex items-center gap-2 text-[var(--color-button)] cursor-pointer hover:text-[var(--color-primary)] transition-colors duration-300">
                    <Link href="/product" className="leading-none">Xem thêm</Link>
                    <FaAngleRight className="text-base leading-none" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-2 h-fit" >
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />

            </div>


        </div>
    );
}

export default GroupProduct;
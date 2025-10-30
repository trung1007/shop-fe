"use client"
import useProduct from "@/hooks/useProduct";
import GroupProduct from "./GroupProduct";
import { getAllProducts } from "@/services/productService";
import { useEffect } from "react";
import Product from "@/app/products/[[...slug]]/page";

const ListGroupProduct = () => {
    const {
        records: products,
        fetching,
        sortField,
        serverParams,
        fetchRecords
    } = useProduct<Product>(getAllProducts, "getListsProductByGroup");




    return (
        <div>
            {products && (<GroupProduct groupTitle="Tất cả sản phẩm" type="all" slug="" products={products} />)}

            {/* <GroupProduct groupTitle="Đồ công nghệ" type="cong-nghe" slug="cong-nghe" />
            <GroupProduct groupTitle="Sản phẩm bán chạy" />
            <GroupProduct groupTitle="Siêu giảm giá" />
            <GroupProduct groupTitle="Gợi ý hôm nay" /> */}
        </div>
    );
}

export default ListGroupProduct;
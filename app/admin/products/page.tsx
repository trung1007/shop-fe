"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Pagination } from "antd";
import AddProductModal from "@/components/modal/AddProductModal";
import BaseButton from "@/components/common/BaseButton";
import useProduct from "@/hooks/useProduct";
import { getAllProducts } from "@/services/productService";
import BaseInput from "@/components/common/BaseInput";
import BaseInputSearch from "@/components/common/BaseInputSearch";
import debounce from "lodash.debounce";
import {
  FilterOperator,
  FilterOperatorField,
} from "@/constants/FilterOperator";
type Product = {
  id: number;
  name: string;
  price: number;
  imgUrls: string[];
  description: string;
  stockQuantity: number;
  category: Category;
};

type Category = {
  name: string;
  slug: string;
  description: string;
};

const AdminProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const {
    records: products,
    totalRecords,
    fetching,
    sortField,
    serverParams,
    fetchRecords,
    onParamsChange,
  } = useProduct<Product>(getAllProducts);

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      onParamsChange({ searchKey: value });
    }, 500),
    [serverParams, fetchRecords]
  );

  const onSearchChange = (value: string) => {
    const valueSearch =
      FilterOperatorField.NAME + FilterOperator.CONTAINS + value;
    setSearchKey(value);
    handleSearch(valueSearch);
  };

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-1 items-center justify-between mb-6 gap-5">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        <div className="flex flex-1">
          <BaseInputSearch
            placeholder="Tìm kiếm sản phẩm"
            value={searchKey}
            className="w-full"
            onChange={onSearchChange}
          />
        </div>
        <BaseButton onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </BaseButton>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 cursor-pointer">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                STT
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Tên sản phẩm
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Ảnh
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Mô tả
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Giá
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Số lượng
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Danh mục
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products?.map((product: Product, index: number) => (
              <tr key={product.id}>
                <td className="px-4 py-2 text-sm"> {(serverParams.page - 1) * serverParams.size + (index + 1)}</td>
                <td className="px-4 py-2 text-sm">{product.name}</td>
                <td className="px-4 py-2">
                  {product.imgUrls?.length > 0 ? (
                    <img
                      src={product.imgUrls[0]}
                      alt={product.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-4 py-2 text-sm">
                  {product.description ?? "-"}
                </td>
                <td className="px-4 py-2 text-sm">
                  {(product.price ?? 0).toLocaleString()} ₫
                </td>
                <td className="px-4 py-2 text-sm">{product.stockQuantity}</td>
                <td className="px-4 py-2 text-sm">{product.category?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination
          current={serverParams.page} // ✅ lấy từ serverParams
          pageSize={serverParams.size} // ✅ lấy từ serverParams
          total={totalRecords} // ✅ từ API
          onChange={(page) => onParamsChange({ page })} // ✅ đổi page
          showSizeChanger={false}
        />
      </div>
      {isModalOpen && (
        <AddProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default AdminProductPage;

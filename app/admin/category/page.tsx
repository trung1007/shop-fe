"use client";
import BaseButton from "@/components/common/BaseButton";
import BaseInputSearch from "@/components/common/BaseInputSearch";
import AddCategoryModal from "@/components/modal/AddCategoryModal";
import AddSubCategoryModal from "@/components/modal/AddSubCategoryModal";
import { FilterOperator, FilterOperatorField } from "@/constants/FilterOperator";
import useProduct from "@/hooks/useProduct";
import { getListCategories } from "@/services/productService";
import { Button, Pagination } from "antd";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

type Category = {
  id: number;
  name: string;
  img: string;
  description: string;
};

const CategoryAdminPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const {
    records: categories,
    totalRecords,
    fetching,
    sortField,
    serverParams,
    fetchRecords,
    onParamsChange,
  } = useProduct<Category>(getListCategories);

  useEffect(() => {
    console.log("categories", categories);
  }, [categories]);

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Danh sách Danh mục</h1>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-1">
            <BaseInputSearch
              placeholder="Tìm kiếm danh mục"
              value={searchKey}
              className="w-full"
              onChange={onSearchChange}
            />
          </div>
          <BaseButton onClick={() => setIsCategoryOpen(true)}>
            Thêm danh mục cha
          </BaseButton>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 cursor-pointer">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                STT
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Tên danh mục
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Ảnh
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Mô tả
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories?.map((category: Category, index: number) => (
              <tr key={category.id}>
                <td className="px-4 py-2 text-sm">
                  {" "}
                  {(serverParams.page - 1) * serverParams.size + (index + 1)}
                </td>
                <td className="px-4 py-2 text-sm">{category.name}</td>
                <td className="px-4 py-2">
                  {category.img != null ? (
                    <img
                      src={category.img}
                      alt={category.name}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 text-sm">
                  {category.description ?? "-"}
                </td>
                <td className="px-4 py-2 h-full text-sm">
                  <div className="flex h-full items-center space-x-4">
                    <button
                      // onClick={() => handleView(subcategory)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                    >
                      <FaEye />
                    </button>
                    <button
                      // onClick={() => handleEdit(subcategory)}
                      className="text-green-500 hover:text-green-700 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      // onClick={() => handleDelete(subcategory.subCategoryInfo?.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
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
      {isCategoryOpen && (
        <AddCategoryModal
          open={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
        // onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default CategoryAdminPage;

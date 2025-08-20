"use client";

import BaseButton from "@/components/common/BaseButton";
import AddSubCategoryModal from "@/components/modal/AddSubCategoryModal";
import useProduct from "@/hooks/useProduct";
import { getListSubCategories } from "@/services/productService";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

type SubCategory = {
  id: number;
  categoryName: string;
  imgUrl: string;
  subCategoryInfo: subInfo;
};

type subInfo = {
  name: string;
  description: string;
};

const SubCategoryAdminPage = () => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  const {
    records: subcategories,
    totalRecords,
    fetching,
    sortField,
    serverParams,
    fetchRecords,
    onParamsChange,
  } = useProduct<SubCategory>(getListSubCategories);

  useEffect(() => {
    console.log("subcategories", subcategories);
  }, [subcategories]);

  return (
    <div className="p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Danh sách Danh mục con</h1>
        <div className="flex flex-wrap gap-3">
          <BaseButton onClick={() => setIsSubCategoryOpen(true)}>
            Thêm danh mục con
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
                Danh mục cha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {subcategories?.map((subcategory: SubCategory, index: number) => (
              <tr key={subcategory.id}>
                <td className="px-4 py-2 text-sm">
                  {(serverParams.page - 1) * serverParams.size + (index + 1)}
                </td>

                {/* Tên danh mục */}
                <td className="px-4 py-2 text-sm">
                  {subcategory.subCategoryInfo?.name ?? "—"}
                </td>

                {/* Ảnh */}
                <td className="px-4 py-2">
                  {subcategory.imgUrl ? (
                    <img
                      src={subcategory.imgUrl}
                      alt={subcategory.subCategoryInfo?.description ?? "No description"}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded">
                      No Image
                    </div>
                  )}
                </td>

                {/* Mô tả */}
                <td className="px-4 py-2 text-sm">
                  {subcategory.subCategoryInfo?.description ?? "—"}
                </td>
                 <td className="px-4 py-2 text-sm">
                  {subcategory.categoryName ?? "—"}
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
      {isSubCategoryOpen && (
        <AddSubCategoryModal
          open={isSubCategoryOpen}
          onClose={() => setIsSubCategoryOpen(false)}
          // onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default SubCategoryAdminPage;

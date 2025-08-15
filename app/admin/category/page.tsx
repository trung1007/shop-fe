"use client";
import BaseButton from "@/components/common/BaseButton";
import AddCategoryModal from "@/components/modal/AddCategoryModal";
import AddSubCategoryModal from "@/components/modal/AddSubCategoryModal";
import { Button } from "antd";
import { useState } from "react";

const CategoryAdminPage = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Danh sách Danh mục</h1>
        <div className="flex flex-wrap gap-3">
          {/* <button
            className="p-4 h-[40px] bg-[var(--color-primary)] flex justify-center items-center text-white rounded-[12px] cursor-pointer transition-colors duration-300 hover:bg-[var(--color-primary-hover)]"
            onClick={() => setIsCategoryOpen(true)}
          >
            Thêm danh mục cha
          </button> */}
          <BaseButton onClick={() => setIsCategoryOpen(true)}>
            Thêm danh mục cha
          </BaseButton>
          <BaseButton onClick={() => setIsSubCategoryOpen(true)}>
            Thêm danh mục con
          </BaseButton>
        </div>
        {isCategoryOpen && (
          <AddCategoryModal
            open={isCategoryOpen}
            onClose={() => setIsCategoryOpen(false)}
            // onSubmit={handleAddProduct}
          />
        )}

        {isSubCategoryOpen && (
          <AddSubCategoryModal
            open={isSubCategoryOpen}
            onClose={() => setIsSubCategoryOpen(false)}
            // onSubmit={handleAddProduct}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryAdminPage;

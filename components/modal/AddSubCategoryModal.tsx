"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCategory,
  addSubCategory,
  getListCategories,
} from "@/services/productService";
import {
  CategoryInput,
  CategorySchema,
  SubCategoryInput,
  SubCategorySchema,
} from "@/schemas/product.schema";
import BaseInput from "@/components/common/BaseInput";
import BaseDropdown from "../common/BaseDropdown";
import BaseUpload from "../common/BaseUpload";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "@/stores/loadingSlice";
import { useQuery } from "@tanstack/react-query";
import BaseCheckBox from "../common/BaseCheckBox";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddSubCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCategoryInput>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: undefined,
      image: undefined,
      isPopular: false,
    },
    resolver: zodResolver(SubCategorySchema),
  });

  const dispatch = useDispatch();

  const {
    data: categoryOptions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getListCategories();
      return data.map((cat: any) => ({
        label: cat.nameVi,
        value: cat.id,
      }));
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [uploadResetKey, setUploadResetKey] = useState(0);

  const handleFormSubmit = async (data: SubCategoryInput) => {
    dispatch(showLoading());
    try {
      const payloadAddSubCategory = {
        name: data.name,
        description: data.description,
        rootCategoryId: data.categoryId,
        popular: data.isPopular,
      };
      
      await addSubCategory(payloadAddSubCategory, data.image);
      onSuccess?.();
      reset();
      setUploadResetKey((prev) => prev + 1);
      Promise.resolve().then(() => {
        onClose();
      });
      dispatch(hideLoading());
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <Modal
      title="Thêm danh mục con"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      okText="Thêm"
      cancelText="Hủy"
      okButtonProps={{
        style: {
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-primary)",
        },
      }}
    >
      <form className="flex flex-col gap-4 pt-2">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <BaseInput
              label="Tên danh mục con"
              required
              error={errors.name?.message}
              type="text"
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <BaseInput
              label="Mô tả"
              required
              error={errors.description?.message}
              {...field}
              value={field.value ?? ""}
              as="textarea"
              className="h-[80px]"
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <BaseUpload
              id="image"
              {...field}
              label="Hình ảnh danh mục"
              error={errors.image?.message}
              multiple={false}
              resetTrigger={uploadResetKey}
              onChange={(files: File[]) => field.onChange(files[0] || null)}
            />
          )}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <BaseDropdown
              {...field}
              label="Chọn danh mục cha"
              required
              onChange={(e) => field.onChange(Number(e.target.value))}
              error={errors.categoryId?.message}
              value={field.value ?? ""}
              options={categoryOptions}
              isOpen={dropdownOpen}
              setIsOpen={setDropdownOpen}
            />
          )}
        />
        <Controller
          name="isPopular"
          control={control}
          render={({ field }) => (
            <BaseCheckBox
              label="Danh mục phổ biến"
              checked={!!field.value}
              onChange={field.onChange}
              checkedColor="var(--color-primary)"
            />
          )}
        />
      </form>
    </Modal>
  );
};

export default AddSubCategoryModal;

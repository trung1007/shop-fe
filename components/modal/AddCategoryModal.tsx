"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategory } from "@/services/productService";
import { CategoryInput, CategorySchema } from "@/schemas/product.schema";
import BaseInput from "@/components/common/BaseInput";
import BaseDropdown from "../common/BaseDropdown";
import BaseUpload from "../common/BaseUpload";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "@/stores/loadingSlice";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
    resolver: zodResolver(CategorySchema),
  });

  const dispatch = useDispatch();

  const [uploadResetKey, setUploadResetKey] = useState(0);

  const handleFormSubmit = async (data: CategoryInput) => {
    dispatch(showLoading());
    try {
      const payloadAddCategory = {
        name: data.name,
        description: data.description,
      };


      await addCategory(payloadAddCategory, data.image);
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
      title="Thêm danh mục"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      okText="Thêm"
      cancelText="Hủy"
    >
      <form className="flex flex-col gap-4 pt-2">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <BaseInput
              label="Tên danh mục"
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
      </form>
    </Modal>
  );
};

export default AddCategoryModal;

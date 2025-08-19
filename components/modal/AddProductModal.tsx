"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { addProduct, getListSubCategories } from "@/services/productService";
import { ProductInput, ProductSchema } from "@/schemas/product.schema";
import BaseInput from "@/components/common/BaseInput";
import BaseDropdown from "../common/BaseDropdown";
import BaseUpload from "../common/BaseUpload";
import { showLoading, hideLoading } from "@/stores/loadingSlice";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      imageDetails: [],
      imageThumbnails: [],
      description: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  // ✅ Sử dụng react-query thay cho useEffect
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subCategories"],
    queryFn: getListSubCategories,
  });

  const categoryOptions =
    data?.map((cat: any) => ({
      label: cat.subCategoryInfo.name,
      value: cat.categoryId,
    })) ?? [];

  const watchedPrice = watch("price");
  const watchedQuantity = watch("quantity");

  const handleFormSubmit = async (data: ProductInput) => {
    dispatch(showLoading());
    try {
      const payloadAddProduct = {
        name: data.name,
        description: data.description,
        price: data.price,
        stockQuantity: data.quantity,
        categoryId: data.categoryId,
      };
      console.log(payloadAddProduct, data.imageDetails, data.imageThumbnails);

      await addProduct(
        payloadAddProduct,
        data.imageDetails,
        data.imageThumbnails
      );
      onSuccess?.();
      reset();
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
      title="Thêm sản phẩm"
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
              label="Tên sản phẩm"
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
          name="price"
          control={control}
          render={({ field }) => (
            <BaseInput
              label="Giá"
              type="text"
              required
              error={errors.price?.message}
              value={Number(watchedPrice || 0).toLocaleString("en-US")}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const parsed = Number(raw);
                field.onChange(isNaN(parsed) ? 0 : parsed);
              }}
            />
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <BaseInput
              label="Số lượng"
              type="text"
              required
              error={errors.quantity?.message}
              {...field}
              value={Number(watchedQuantity || 0).toLocaleString("en-US")}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const parsed = Number(raw);
                field.onChange(isNaN(parsed) ? 0 : parsed);
              }}
            />
          )}
        />

        <Controller
          name="imageDetails"
          control={control}
          render={({ field }) => (
            <BaseUpload
              id="imageDetails"
              {...field}
              label="Hình ảnh"
              error={errors.imageDetails?.message}
              multiple={true}
              onChange={(files: File[]) => field.onChange(files)}
            />
          )}
        />

        <Controller
          name="imageThumbnails"
          control={control}
          render={({ field }) => (
            <BaseUpload
              id="imageThumbnails"
              {...field}
              label="Hình ảnh"
              error={errors.imageThumbnails?.message}
              multiple={true}
              onChange={(files: File[]) => field.onChange(files)}
            />
          )}
        />

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <BaseDropdown
              {...field}
              label="Danh mục"
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
      </form>
    </Modal>
  );
};

export default AddProductModal;

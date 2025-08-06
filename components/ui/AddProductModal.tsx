"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addProduct, getListCategories } from "@/services/productService";
import { ProductInput, ProductSchema } from "@/schemas/product.schema";
import BaseInput from "@/components/common/BaseInput";
import BaseDropdown from "../common/BaseDropdown";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface Category {
  id: number;
  name: string;
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
      image: "",
      description: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState<
    { label: string; value: number }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getListCategories();
        const mapped = data.map((cat: any) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategoryOptions(mapped);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const watchedPrice = watch("price");
  const watchedQuantity = watch("quantity");

  const handleFormSubmit = async (data: ProductInput) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.image,
        stockQuantity: data.quantity,
        categoryId: data.categoryId,
      };
      console.log("Submitting product data:", payload);

      await addProduct(payload);
      onSuccess?.();
      reset();
      Promise.resolve().then(() => {
        onClose();
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
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
          name="image"
          control={control}
          render={({ field }) => (
            <BaseInput
              label="Link ảnh"
              required
              error={errors.image?.message}
              {...field}
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

"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addProduct, getListCategories } from "@/services/productService";
import { ProductInput, ProductSchema } from "@/schemas/product.schema";
import BaseInput from "@/components/common/BaseInput";
import BaseDropdown from "../common/BaseDropdown";
import BaseUpload from "../common/BaseUpload";
import { uploadFile } from "@/services";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "@/stores/loadingSlice";

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
    setValue,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      image: null,
      description: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const dispatch = useDispatch();

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
    dispatch(showLoading());
    try {
      let imageUrl = null;
      if (data.image) {
        const uploadResponse = await uploadFile(data.image);
        imageUrl = uploadResponse?.fileName || null;
      }
      const payloadAddProduct = {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: imageUrl,
        stockQuantity: data.quantity,
        categoryId: data.categoryId,
      };
      await addProduct(payloadAddProduct);
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
          name="image"
          control={control}
          render={({ field }) => (
            <BaseUpload
              id="image"
              {...field}
              label="Hình ảnh"
              error={errors.image?.message}
              onChange={(file) => setValue("image", file)}
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

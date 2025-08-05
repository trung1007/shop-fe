"use client";

import React from "react";
import { Modal, Input, InputNumber, Form } from "antd";
import { useForm, Controller } from "react-hook-form";

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => void;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>();

    const handleFormSubmit = (data: ProductFormData) => {
        onSubmit(data);
        reset(); // reset form sau khi submit
        onClose();
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
            <Form layout="vertical">
                <Form.Item label="Tên sản phẩm" validateStatus={errors.name && "error"} help={errors.name?.message}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Vui lòng nhập tên sản phẩm" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item label="Mô tả" validateStatus={errors.description && "error"} help={errors.description?.message}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <Input.TextArea {...field} rows={3} />}
                    />
                </Form.Item>

                <Form.Item label="Giá" validateStatus={errors.price && "error"} help={errors.price?.message}>
                    <Controller
                        name="price"
                        control={control}
                        rules={{ required: "Vui lòng nhập giá", min: 0 }}
                        render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
                    />
                </Form.Item>

                <Form.Item label="Số lượng" validateStatus={errors.quantity && "error"} help={errors.quantity?.message}>
                    <Controller
                        name="quantity"
                        control={control}
                        rules={{ required: "Vui lòng nhập số lượng", min: 0 }}
                        render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} />}
                    />
                </Form.Item>

                <Form.Item label="Link ảnh sản phẩm" validateStatus={errors.image && "error"} help={errors.image?.message}>
                    <Controller
                        name="image"
                        control={control}
                        rules={{ required: "Vui lòng nhập link ảnh" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;

"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import AddProductModal, { ProductFormData } from "@/components/ui/AddProductModal"; 

const mockProducts = [
    {
        id: 1,
        name: "Laptop ASUS ROG",
        image: "https://via.placeholder.com/80x80.png?text=ASUS",
        price: 25000000,
        quantity: 12,
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        image: "https://via.placeholder.com/80x80.png?text=iPhone",
        price: 33990000,
        quantity: 8,
    },
    {
        id: 3,
        name: "Tai nghe Sony WH-1000XM5",
        image: "https://via.placeholder.com/80x80.png?text=Sony",
        price: 6990000,
        quantity: 20,
    },
];

const AdminProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProduct = (data: ProductFormData) => {
        console.log("Sản phẩm mới:", data);
        // TODO: Gửi data lên server, hoặc thêm vào state sản phẩm
        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Thêm sản phẩm
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">STT</th>
                            <th className="px-4 py-3 text-left">Hình ảnh</th>
                            <th className="px-4 py-3 text-left">Tên sản phẩm</th>
                            <th className="px-4 py-3 text-left">Giá</th>
                            <th className="px-4 py-3 text-left">Số lượng</th>
                            <th className="px-4 py-3 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.map((product, index) => (
                            <tr key={product.id} className="border-t">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={60}
                                        height={60}
                                        className="rounded object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3">{product.name}</td>
                                <td className="px-4 py-3">
                                    {product.price.toLocaleString()}₫
                                </td>
                                <td className="px-4 py-3">{product.quantity}</td>
                                <td className="px-4 py-3 space-x-2">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                        Sửa
                                    </button>
                                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddProductModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddProduct}
            />
        </div>
    );
};

export default AdminProductPage;

"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Pagination } from "antd";
import AddProductModal from "@/components/ui/AddProductModal";

// Fake 30 sản phẩm
// const generateMockProducts = () => {
//     const types = ["laptop", "phone", "headphone"];
//     const names = ["ASUS ROG", "iPhone", "Sony", "Samsung", "Dell", "HP", "JBL"];
//     return Array.from({ length: 30 }, (_, i) => ({
//         id: i + 1,
//         name: `${names[i % names.length]} #${i + 1}`,
//         image: `https://via.placeholder.com/80x80.png?text=${encodeURIComponent(
//             names[i % names.length]
//         )}`,
//         price: 1000000 + (i % 10) * 1000000,
//         quantity: Math.floor(Math.random() * 20) + 1,
//         type: types[i % types.length],
//     }));
// };

const AdminProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [products, setProducts] = useState(generateMockProducts());
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;
    // const currentProducts = products.slice(
    //     (currentPage - 1) * pageSize,
    //     currentPage * pageSize
    // );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Thêm sản phẩm
                </Button>
            </div>

            {/* <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">STT</th>
                            <th className="px-4 py-3 text-left">Hình ảnh</th>
                            <th className="px-4 py-3 text-left">Tên sản phẩm</th>
                            <th className="px-4 py-3 text-left">Giá</th>
                            <th className="px-4 py-3 text-left">Phân loại</th>
                            <th className="px-4 py-3 text-left">Số lượng</th>
                            <th className="px-4 py-3 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr key={product.id} className="border-t">
                                <td className="px-4 py-3">
                                    {(currentPage - 1) * pageSize + index + 1}
                                </td>
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
                                <td className="px-4 py-3">{product.type}</td>
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
            </div> */}

            {/* <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div> */}

            <AddProductModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // onSubmit={handleAddProduct}
            />
        </div>
    );
};

export default AdminProductPage;

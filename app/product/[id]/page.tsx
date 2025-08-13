"use client";

import BreadCrumb from "@/components/common/BreadCrumb";
import productImg2 from "@/assets/images/product-img-test-1.webp";
import productImg1 from "@/assets/images/product-img-test-2.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Table, Tabs } from "antd";
import "@/styles/tabs.css";
import { fetchAPI } from "@/hooks/fetchAPI";
import { getDetailProduct } from "@/services/productService";
import { useParams } from "next/navigation";
import { formatPrice } from "@/utils";

const ProductDetail = () => {

    const { id } = useParams<{ id: string }>();

    const { data, isLoading, error } = fetchAPI({
        queryKey: ["product", id],
        service: () => getDetailProduct(Number(id)),
        options: {
            staleTime: 1000 * 60,
            refetchOnWindowFocus: false,
        },
    });

    useEffect(() => {
        console.log("data", data);

    }, [data])

    const { TabPane } = Tabs;
    const images = data?.imgUrls || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const features = [
        {
            title: "Kết nối ba chế độ",
            description: "Hỗ trợ kết nối không dây Bluetooth, 2.4 GHz và có dây – linh hoạt với mọi nhu cầu sử dụng."
        },
        {
            title: "Cấu trúc gasket",
            description: "Mang lại trải nghiệm gõ êm ái, giảm rung hiệu quả, tạo âm thanh cao cấp."
        },
        {
            title: "Hot-swap toàn phím",
            description: "Dễ dàng thay switch mà không cần hàn – nâng cấp linh hoạt theo sở thích."
        },
        {
            title: "Pin 4000 mAh",
            description: "Sử dụng lâu dài cho nhu cầu chơi game và làm việc không gián đoạn."
        },
        {
            title: "Kiểu layout 75%",
            description: "Tiết kiệm diện tích nhưng vẫn giữ đủ phím chức năng cần thiết."
        },
    ];

    const specsData = [
        { key: "1", spec: "Kết nối", value: "Bluetooth, 2.4 GHz, Wired" },
        { key: "2", spec: "Số phím", value: "80 Keys (75% layout)" },
        { key: "3", spec: "Switch", value: "Hot-swappable, factory-lubed" },
        { key: "4", spec: "Cấu trúc", value: "Gasket mount" },
        { key: "5", spec: "Keycaps", value: "Cherry profile double-shot PBT" },
        { key: "6", spec: "Pin", value: "4000 mAh Li-ion" },
        { key: "7", spec: "Kích thước", value: "322.7 × 143.2 × 43.1 mm" },
        { key: "8", spec: "Trọng lượng", value: "1023 g" },
        { key: "9", spec: "RGB", value: "16.8 triệu màu" },
        { key: "10", spec: "Anti-ghosting", value: "NKRO" },
    ];

    const columns = [
        { title: "Thông số", dataIndex: "spec", key: "spec", width: "40%" },
        { title: "Giá trị", dataIndex: "value", key: "value" },
    ];
    return (
        <div className="w-full h-fit flex flex-col gap-5 ">
            <BreadCrumb
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Sản phẩm", href: "/product" },
                    { label: "Chi tiết sản phẩm" },
                ]}
            />
            <div className="product-detail grid grid-cols-2 gap-5  ">
                {/* Cột hình ảnh sản phẩm */}
                <div className="w-full flex flex-col items-center bg-white p-5">
                    <div className=" product-image relative w-full max-w-xl mx-auto">
                        {/* Vùng hiển thị ảnh */}
                        <div className="overflow-hidden ">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                }}
                            >
                                {images.map((img: any, idx: any) => (
                                    <div
                                        key={idx}
                                        className="w-full flex-shrink-0 flex justify-center items-center bg-white h-[300px]"
                                    >
                                        <Image
                                            src={img}
                                            alt={`Product ${idx}`}
                                            width={500} // hoặc số px bạn muốn
                                            height={500}
                                            className="w-auto h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={prevImage}
                            disabled={currentIndex === 0}
                            className={`absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full shadow transition 
                                        ${currentIndex === 0
                                    ? "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
                                    : "bg-white/80 hover:bg-white text-black"}`}
                        >
                            <FaChevronLeft />
                        </button>

                        <button
                            onClick={nextImage}
                            disabled={currentIndex === images.length - 1}
                            className={`absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full shadow transition
                                        ${currentIndex === images.length - 1
                                    ? "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
                                    : "bg-white/80 hover:bg-white text-black"}`}
                        >
                            <FaChevronRight />
                        </button>

                        {/* Thanh chọn ảnh nhỏ */}
                        <div className="flex justify-center gap-2 mt-3">
                            {images.map((img: any, idx: any) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`border rounded-lg overflow-hidden ${currentIndex === idx
                                        ? "border-blue-500"
                                        : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumb ${idx}`}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-contain bg-white"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-info w-full">
                        <Tabs defaultActiveKey="1" className="flex justify-center">
                            <TabPane tab="Đặc điểm nổi bật" key="1">
                                <div className="space-y-4 text-gray-800">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {data?.name}
                                    </h2>

                                    {/* Ảnh sản phẩm */}
                                    <div className="w-full flex justify-center">
                                        <div className="max-w-[400px]">
                                            <Image
                                                src={productImg2}
                                                alt="Bàn phím cơ AULA F75"
                                                width={400}
                                                height={200}
                                                priority
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>
                                    </div>
                                    {features.map((feature, idx) => (
                                        <p key={idx}>
                                            <span className="font-semibold">{feature.title}:</span>{" "}
                                            {feature.description}
                                        </p>
                                    ))}
                                </div>
                            </TabPane>
                            <TabPane tab="Thông số kỹ thuật" key="2">
                                <Table
                                    columns={columns}
                                    dataSource={specsData}
                                    pagination={false}
                                    bordered
                                    size="small"
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>

                {/* Cột thông tin sản phẩm */}
                <div className="bg-white flex flex-col h-fit p-5 ">
                    <h1 className="text-2xl font-bold mb-2">
                        {data?.name}
                    </h1>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-red-600 text-3xl font-bold">{formatPrice(data?.price)} VNĐ </span>
                        <span className="line-through text-gray-500">6.800.000₫</span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                            -36%
                        </span>
                    </div>

                    {/* Chọn màu */}
                    <div className="mb-4">
                        <span className="block mb-2 font-medium">Màu sắc</span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded-lg bg-blue-50 border-blue-500">
                                Trắng
                            </button>
                            <button className="px-4 py-2 border rounded-lg">Đen</button>
                        </div>
                    </div>

                    {/* Chọn số lượng */}
                    <div className="flex items-center gap-2 mb-4">
                        <button className="px-3 py-1 border rounded">-</button>
                        <span>1</span>
                        <button className="px-3 py-1 border rounded">+</button>
                        <span className="text-green-600">✓ Sẵn trong kho</span>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex gap-3 mb-4">
                        <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700">
                            Thêm vào giỏ
                        </button>
                        <button className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50">
                            Mua ngay
                        </button>
                    </div>

                    {/* Thông tin thêm */}
                    <ul className="text-gray-600 text-sm space-y-1">
                        <li>🚚 Giao hàng miễn phí trong 24h (nội thành)</li>
                        <li>💳 Trả góp 0% qua thẻ tín dụng Visa, Master, JCB</li>
                        <li>🔄 Đổi trả miễn phí trong 30 ngày</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

import Image from "next/image";
import productImg2 from "@/assets/images/product-img-test-1.webp";
import productImg1 from "@/assets/images/product-img-test-2.png";

const ProductCard = () => {
    return (
        <div className="group relative w-full flex flex-col items-center cursor-pointer">
            {/* Card content */}
            <div className="product-card flex flex-col gap-2 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
                {/* Ảnh */}
                <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                        src={productImg1}
                        alt="Product"
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Image
                        src={productImg2}
                        alt="Product Hover"
                        fill
                        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </div>

                {/* Tên sản phẩm */}
                <p className="text-sm font-medium line-clamp-2">
                    Bàn phím cơ Aula F75 (Mạch xuôi 5 pin, Gasket Mount, Led RGB, Switch Outemu)
                </p>

                {/* Giá */}
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                        16.690.000₫
                    </span>
                    <span className="text-gray-400 text-sm line-through">19.800.000₫</span>
                </div>

                {/* Giảm giá */}
                <div className="bg-[var(--color-bg)] text-[var(--color-button)] text-xs font-semibold px-2 py-1 rounded w-fit">
                    -16%
                </div>

                {/* Button bên dưới, ẩn/hiện khi hover */}
                <div
                    className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300 flex justify-center"
                >
                    <button className="mt-2 bg-[var(--color-button)] text-white px-6 py-2 rounded-full shadow-md">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

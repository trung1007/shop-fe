import Image from "next/image";
import productImg2 from "@/assets/images/product-img-test-1.webp";
import productImg1 from "@/assets/images/product-img-test-2.png";

const ProductCard = () => {
    return (
        <div className="group relative w-full flex flex-col">
            <div className="product-card relative flex flex-col gap-2 px-4 py-3 bg-white rounded-[8px] shadow-md hover:shadow-lg transition-shadow duration-300 w-full">

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
                <p className="text-sm font-medium line-clamp-2 cursor-pointer hover:text-[var(--color-primary)]">
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

                {/* Button overlay */}
                <div
                    className="absolute h-fit  bg-[white] bottom-0 left-0 w-full flex justify-center pb-3
                       opacity-0 translate-y-[12px] transition-all duration-300 ease-out
                       group-hover:opacity-100 group-hover:translate-y-[48px] rounded-b-[8px]"
                >
                    <button className="bg-[var(--color-button)] text-white px-6 py-2 rounded-full shadow-md">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;

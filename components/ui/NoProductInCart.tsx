import Image from "next/image";

const NoProductInCart = ({onClick}:any) => {
  return (
    <>
      <Image
        src="https://staging-api.dewcms.com//uploads/public/derived/p_l/empty-cart.webp"
        alt="Giỏ hàng trống"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Giỏ hàng của bạn đang trống
      </h1>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Hãy tìm sản phẩm ưng ý và thêm vào giỏ hàng để bắt đầu mua sắm nhé!
      </p>
      <button className="px-6 py-2 bg-[var(--color-button)] text-white rounded-full hover:bg-[var(--color-primary)] transition-colors" onClick={onClick}>
        Tiếp tục mua sắm
      </button>
    </>
  );
};
export default NoProductInCart;

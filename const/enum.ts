export enum ProductType {
  ALL = "all",
  PHONE = "phone",
  LAPTOP = "laptop",
  TABLET = "tablet",
}

export const ProductTypeTitle: Record<keyof typeof ProductType, string> = {
  ALL: "Tất cả sản phẩm",
  PHONE: "Điện thoại",
  LAPTOP: "Laptop",
  TABLET: "Máy tính bảng",
};
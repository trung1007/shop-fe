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

type ProductCategoryType = {
  [key: string]: string;
};

export const ProductCategory: ProductCategoryType = {
  "cong-nghe": "Sản phẩm công nghệ",
  "thoi-trang": "Thời trang",
  "dien-may": "Điện máy",
  "gia-dung": "Đồ gia dụng",
  "ban-phim": "Bàn phím",
  "tai-nghe": "Tai nghe"
};
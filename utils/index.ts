export const formatPrice = (price: number | null | undefined): string => {
  if (price == null || isNaN(price)) return "0";
  return price.toLocaleString("vi-VN");
};
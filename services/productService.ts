import api from "@/lib/axios";

export const getListCategories = async () => {
  const response = await api.get("/category/all");
  return response.data;
}

export const addProduct = async (data: any) => {
  const response = await api.post("/product/add", data);
  return response.data;
}
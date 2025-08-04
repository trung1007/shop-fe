import api from "@/lib/axios";

export const getListCategories = async () => {
  const response = await api.get("/category/all");
  return response.data;
}
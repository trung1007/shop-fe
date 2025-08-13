import api from "@/lib/axios";

export const getListCategories = async () => {
  const response = await api.get("/category/all");
  return response.data;
}

export const getAllProducts = async (params: any) => {
  const response = await api.get("/product/all", { params });
  return response.data;
};

export const addProduct = async (product: any, fileImage: any) => {
  const formData = new FormData();
  formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
  formData.append("fileImage", fileImage)
  const response = await api.post("/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  return response.data;
}
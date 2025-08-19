import api from "@/lib/axios";

export const getListCategories = async () => {
  const response = await api.get("/category/all");
  return response.data;
};

export const getListSubCategories = async () => {
  const response = await api.get("/sub_category/all");
  return response.data;
};

export const getAllProducts = async (params: any) => {
  const response = await api.get("/product/all", { params });
  return response.data;
};

export const getPopularSubCategories = async () => {
  const response = await api.get("/sub_category/popular");
  return response.data;
};

export const addProduct = async (product: any, imageDetails: File[], imageThumbnails: File[]) => {
  const formData = new FormData();
  formData.append(
    "product",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );
  imageDetails.forEach((file) => {
    formData.append("imageDetails", file);
  });
  imageThumbnails.forEach((file) => {
    formData.append("imageThumbnails", file);
  });
  const response = await api.post("/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const addCategory = async (product: any, image: File) => {
  const formData = new FormData();
  formData.append(
    "category",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );
  formData.append("image", image);

  const response = await api.post("/category/save", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const addSubCategory = async (product: any, image: File) => {
  const formData = new FormData();
  formData.append(
    "subCategory",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );
  formData.append("image", image);

  const response = await api.post("/sub_category/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

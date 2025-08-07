import axios from "@/lib/axios";

export const uploadFile = async (file: File | null) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

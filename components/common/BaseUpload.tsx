import axios from "@/lib/axios";
import React, { useState, useEffect } from "react";

interface BaseUploadProps {
  label?: string;
  id: string;
  onChange?: (file: File | null) => void;
  error?: string;
  defaultImage?: string;
}

const BaseUpload: React.FC<BaseUploadProps> = ({
  label,
  id,
  onChange,
  error,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      onChange?.(null);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fileName = response.data.fileName;
      
      setPreview(fileName);
      onChange?.(file);
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="w-full max-w-sm">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        <label
          htmlFor={id}
          className="cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-sm transition"
        >
          Chọn ảnh
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="mt-4">
        <div className="w-40 h-40 border border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">Chưa có ảnh</span>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default BaseUpload;

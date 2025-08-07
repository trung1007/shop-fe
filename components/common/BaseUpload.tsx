import axios from "@/lib/axios";
import { uploadFile } from "@/services";
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;
    setLoading(true);
    try {
      const localImageUrl = URL.createObjectURL(file); 
      setPreview(localImageUrl);
      onChange?.(file);
    } catch (error) {
      console.error("Upload thất bại:", error);
    } finally {
      setLoading(false);
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
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium shadow-sm transition text-white ${
            loading
              ? "bg-gray-400 pointer-events-none opacity-60"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang tải..." : "Chọn ảnh"}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </div>

      <div className="mt-4">
        <div className="w-40 h-40 border border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
          {loading ? (
            <div className="text-sm text-gray-500 animate-pulse">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : preview ? (
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

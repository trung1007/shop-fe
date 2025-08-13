import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface BaseUploadProps {
  label?: string;
  id: string;
  onChange?: (files: File[]) => void;
  error?: string;
  defaultImages?: string[];
  multiple?: boolean;
}

const BaseUpload: React.FC<BaseUploadProps> = ({
  label,
  id,
  onChange,
  error,
  defaultImages = [],
  multiple = false,
}) => {
  const [previews, setPreviews] = useState<string[]>(defaultImages);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    if (!selectedFiles.length) return;

    setLoading(true);
    try {
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
      setFiles((prev) => [...prev, ...selectedFiles]);
      onChange?.([...files, ...selectedFiles]);
    } catch (err) {
      console.error("Upload thất bại:", err);
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newPreviews = [...previews];
    const newFiles = [...files];
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    setPreviews(newPreviews);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

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
          {loading ? "Đang tải..." : multiple ? "Chọn ảnh" : "Chọn ảnh"}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : previews.length ? (
          previews.map((src, index) => (
            <div
              key={index}
              className="relative w-[120px] h-[120px] rounded-md  bg-gray-50"
            >
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover pointer-events-none"
              />
              {/* Icon x để xóa */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 z-10 rounded-[50%] bg-white/80 hover:bg-white p-1 shadow"
                aria-label="Remove image"
              >
                <CloseCircleOutlined color="red" />{" "}
              </button>
            </div>
          ))
        ) : (
          <div
            className="w-[120px] h-[120px] border border-dashed border-gray-300 rounded-md  bg-gray-50 flex justify-center items-center cursor-pointer"
          >
            <span className="text-sm text-gray-400 ">Chưa có ảnh</span>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default BaseUpload;

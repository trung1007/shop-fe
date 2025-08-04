"use client";
import React, { useState } from "react";
import axios from "axios";
import BaseInput from "@/components/common/BaseInput";
import BaseButton from "@/components/common/BaseButton";
import api from "@/lib/axios";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    img: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    code: "",
    img: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {
      name: formData.name ? "" : "Tên không được để trống",
      code: formData.code ? "" : "Mã code không được để trống",
      img: "",
      description: "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post("http://localhost:8181/category/save", formData);
      alert("Tạo category thành công!");
      setFormData({
        name: "",
        code: "",
        img: "",
        description: "",
      });
    } catch (error) {
      console.error("Lỗi khi tạo category:", error);
      alert("Có lỗi xảy ra khi tạo category.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tạo Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <BaseInput
          label="Tên Category"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <BaseInput
          label="Mã Code"
          name="code"
          required
          value={formData.code}
          onChange={handleChange}
          error={errors.code}
        />
        <BaseInput
          label="Link Ảnh"
          name="img"
          value={formData.img}
          onChange={handleChange}
          error={errors.img}
        />
        <BaseInput
          label="Mô tả"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />
        <BaseButton type="submit">Tạo Category</BaseButton>
      </form>
    </div>
  );
};

export default AdminPage;

"use client";
import React, { useState } from "react";
import axios from "axios";
import BaseInput from "@/components/common/BaseInput";
import BaseButton from "@/components/common/BaseButton";
import api from "@/lib/axios";

const AdminPage = () => {

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Trang Admin</h2>
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      </form> */}
    </div>
  );
};

export default AdminPage;

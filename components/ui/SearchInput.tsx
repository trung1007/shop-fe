"use client";

import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  search: string;
  category: string;
};
const categories = [
  "Danh mục sản phẩm",
  "Bàn phím cơ",
  "Chuột & lót chuột",
  "Tai nghe",
];

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      search: "",
      category: categories[0], // default là "Danh mục sản phẩm"
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("Danh mục sản phẩm");

  const onSubmit = (data: FormValues) => {
    console.log("Search:", data.search);
    console.log("Category:", data.category);
    // onSearch(data.search, data.category);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center w-full h-[44px] border border-gray-300 rounded-full overflow-hidden"
    >
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <div className="flex items-center px-4 border-r border-gray-300 h-full">
            <select
              {...field}
              className="bg-transparent outline-none cursor-pointer text-sm text-gray-700 h-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      />
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
            className="flex-1 px-4 text-sm outline-none h-full"
          />
        )}
      />

      <button
        type="submit"
        className="w-[60px] h-full bg-[#ee1926] flex items-center justify-center text-white hover:bg-[#ff1a1a] transition"
      >
        <SearchOutlined />
      </button>
    </form>
  );
};

export default SearchInput;

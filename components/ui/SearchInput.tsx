"use client";

import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("Danh mục sản phẩm");

  const onSubmit = (data: { search: string }) => {
    onSearch(data.search);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center w-full h-[44px] border border-gray-300 rounded-full overflow-hidden"
    >
      <div className="flex items-center px-4 border-r border-gray-300 cursor-pointer whitespace-nowrap text-sm text-gray-700 hover:bg-gray-100 h-full">
        {selectedCategory}
        <DownOutlined className="ml-1 text-xs" />
      </div>

      {/* Input tìm kiếm */}
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

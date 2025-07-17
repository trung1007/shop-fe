"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: { search: string }) => {
    onSearch(data.search);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-[300px]">
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Tìm kiếm..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit)();
              }
            }}
            className="w-full h-[40px] pl-10 pr-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-black"
          />
        )}
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
        <SearchOutlined />
      </span>
    </form>
  );
};

export default SearchInput;

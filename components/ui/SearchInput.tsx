"use client";

import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { SearchOutlined } from "@ant-design/icons";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="search"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder="Tìm kiếm..."
                        prefix={<SearchOutlined size={20} />}
                        allowClear
                        onPressEnter={handleSubmit(onSubmit)}
                    />
                )}
            />
        </form>
    );
};

export default SearchInput;

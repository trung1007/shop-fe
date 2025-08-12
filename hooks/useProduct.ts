"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/stores/loadingSlice";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type ApiResponse<T> = {
  data: T[];
  meta: {
    total: number;
  };
};

interface ServerParams {
  sortAscending: boolean;
  sortField: string;
  page: number;
  size: number;
  searchKey?: string;
}

interface FetchApiParams extends ServerParams {
  [key: string]: any;
}

interface FetchApiResponse<T> {
  data: T[];
  meta: {
    total: number;
  };
}

function useProduct<T>(
  fetchApi: (params: FetchApiParams) => Promise<FetchApiResponse<T>>,
  queryParams: Record<string, any> = {}
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [serverParams, setServerParams] = useState<ServerParams>({
    sortAscending: false,
    sortField: "id",
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    searchKey: "",
  });

  // Cập nhật URL khi params thay đổi
  const updateRouter = (customParams?: Partial<ServerParams>) => {
    const params = new URLSearchParams();

    // custom query params
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (typeof value === "string" && value.trim() === "") return;
      if (typeof value === "number" && isNaN(value)) return;
      params.set(key, value.toString());
    });

    const mergedParams = { ...serverParams, ...customParams };

    if (mergedParams.sortField !== "id" || mergedParams.sortAscending) {
      params.set(
        "sort",
        `${mergedParams.sortField},${
          mergedParams.sortAscending ? "ASC" : "DESC"
        }`
      );
    }

    if (mergedParams.page !== DEFAULT_PAGE) {
      params.set("page", mergedParams.page.toString());
    }

    if (mergedParams.size !== DEFAULT_PAGE_SIZE) {
      params.set("size", mergedParams.size.toString());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const onParamsChange = (params: Partial<ServerParams>) => {
    setServerParams((prev) => {
      const updated = { ...prev, ...params };
      updateRouter(updated);
      return updated;
    });
  };

  const sortField = (field: {
    value: string;
    order?: "ascending" | "descending";
  }) => {
    onParamsChange({
      sortField: field.value || "id",
      sortAscending: field.order === "ascending",
    });
  };

  // Đồng bộ từ URL -> state lần đầu
  useMemo(() => {
    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const sort = searchParams.get("sort");

    if (page) onParamsChange({ page: Number(page) });
    if (size) onParamsChange({ size: Number(size) });

    if (sort) {
      const [sortField, sortDir] = sort.split(",");
      onParamsChange({
        sortField,
        sortAscending: sortDir === "ASC",
      });
    }

    for (const [key, value] of searchParams.entries()) {
      if (key in queryParams) {
        queryParams[key] = value;
      }
    }
  }, []);

  // fetch data với React Query
  const queryKey = ["records", serverParams, queryParams];
  const { data, isFetching, refetch } = useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: async () => {
      dispatch(showLoading());
      try {
        return await fetchApi({
          ...serverParams,
          page: serverParams.page - 1,
          ...queryParams,
        });
      } finally {
        dispatch(hideLoading());
      }
    },
    placeholderData: (prevData) => prevData,
  });

  return {
    records: data?.data ?? [],
    totalRecords: data?.meta?.total ?? 0,
    serverParams,
    fetching: isFetching,
    fetchRecords: refetch,
    onParamsChange,
    sortField,
  };
}

export default useProduct;

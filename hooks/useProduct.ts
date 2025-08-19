"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/stores/loadingSlice";
import { log } from "console";

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
  filterObj: Record<string, any> = {},
  searchParam: string = "",
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
    searchKey: searchParam,
  });

  // Cập nhật URL khi params thay đổi
  const updateRouter = () => {
    const params = new URLSearchParams();

    console.log("filterObj: ", filterObj);

    // custom query params
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (typeof value === "string" && value.trim() === "") return;
      if (typeof value === "number" && isNaN(value)) return;
      // if (typeof value === "object" && value.label != null) {
      //   params.set(key, value.);
      // }
      params.set(key, value.toString());
    });

    // const mergedParams = { ...serverParams, ...customParams };

    if (serverParams.sortField !== "id" || serverParams.sortAscending) {
      params.set(
        "sort",
        `${serverParams.sortField},${serverParams.sortAscending ? "ASC" : "DESC"
        }`
      );
    }

    if (serverParams.page !== DEFAULT_PAGE) {
      params.set("page", serverParams.page.toString());
    }

    if (serverParams.size !== DEFAULT_PAGE_SIZE) {
      params.set("size", serverParams.size.toString());
    }

    router.replace(`${pathname}?${params.toString().replace(/%2C/g, ',')}`);
  };

  const onParamsChange = (params: Partial<ServerParams>) => {
    // updateRouter();
    setServerParams((prev) => ({ ...prev, ...params }));
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
    // console.log()
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
    // console.log("searchParams: ", searchParams);
    for (const [key, value] of searchParams.entries()) {
      console.log("key: ", key);
      if (key in filterObj) {
        console.log("value: ", value);
        filterObj[key] = value;
      }
    }
    // updateRouter();
  }, []);

  // fetch data với React Query
  const queryKey = ["records", serverParams];
  const { data, isFetching, refetch } = useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: async () => {
      dispatch(showLoading());
      try {
        return await fetchApi({
          ...serverParams,
          page: serverParams.page - 1,
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

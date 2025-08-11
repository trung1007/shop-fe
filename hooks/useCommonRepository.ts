'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

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

interface UseCommonRepositoryOptions<T> {
  fetchApi: (params: FetchApiParams) => Promise<FetchApiResponse<T>>;
}

interface Field {
  value: string;
  order?: 'ascending' | 'descending';
}

function useCommonRepository<T>(
  fetchApi: (params: FetchApiParams) => Promise<FetchApiResponse<T>>,
  queryParams: Record<string, any> = {},
  options?: Partial<UseCommonRepositoryOptions<T>>
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mergedOptions: UseCommonRepositoryOptions<T> = {
    fetchApi,
    ...options,
  };

  const [records, setRecords] = useState<T[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fetching, setFetching] = useState(false);

  const [serverParams, setServerParams] = useState<ServerParams>({
    sortAscending: false,
    sortField: 'id',
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    searchKey: '',
  });


  const fetchRecords = async () => {
    if (fetching) return;
    setFetching(true);

    updateRouter();


    try {
      const response = await mergedOptions.fetchApi({
        ...serverParams,
        page: serverParams.page - 1,
      });

      setRecords(response.data);
      setTotalRecords(parseInt(response.meta.total as any));
    } finally {
      setFetching(false);
    }
  };

  const updateRouter = () => {
    const params = new URLSearchParams();

    // custom query params
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (typeof value === 'string' && value.trim() === '') return;
      if (typeof value === 'number' && isNaN(value)) return;
      params.set(key, value.toString());
    });

    if (serverParams.sortField !== 'id' || serverParams.sortAscending) {
      params.set(
        'sort',
        `${serverParams.sortField},${serverParams.sortAscending ? 'ASC' : 'DESC'}`
      );
    }

    if (serverParams.page !== DEFAULT_PAGE) {
      params.set('page', serverParams.page.toString());
    }

    if (serverParams.size !== DEFAULT_PAGE_SIZE) {
      params.set('size', serverParams.size.toString());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const onParamsChange = (params: Partial<ServerParams>) => {
    setServerParams((prev) => ({ ...prev, ...params }));
  };

  const sortField = (field: Field) => {
    onParamsChange({
      sortField: field.value || 'id',
      sortAscending: field.order === 'ascending',
    });
  };

  // Init from search params
  useEffect(() => {
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const sort = searchParams.get('sort');

    if (page) {
      onParamsChange({ page: Number(page) });
    }

    if (size) {
      onParamsChange({ size: Number(size) });
    }

    if (sort) {
      const [sortField, sortDir] = sort.split(',');
      onParamsChange({
        sortField,
        sortAscending: sortDir === 'ASC',
      });
    }

    for (const [key, value] of searchParams.entries()) {
      if (key in queryParams) {
        queryParams[key] = value;
      }
    }

    // Initial fetch
    fetchRecords();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [serverParams]);

  return {
    records,
    totalRecords,
    serverParams,
    fetching,
    fetchRecords,
    onParamsChange,
    sortField,
  };
}

export default useCommonRepository;

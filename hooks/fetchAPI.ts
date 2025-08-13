// fetchAPI.ts
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type FetchAPIParams<T> = {
  queryKey: string | any[];
  service: () => Promise<T>;
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;
};

export function fetchAPI<T>({
  queryKey,
  service,
  options,
}: FetchAPIParams<T>): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: service,
    ...options,
  });
}

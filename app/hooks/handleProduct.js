"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../_lib/apis";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../utils/constant";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const searchParams= useSearchParams();
  let filter = !searchParams.get("filter") ? "all" : searchParams.get("filter");
  let page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    isPending: isLoading,
    data: { data: products, count } = {},
    error,
    isError,
  } = useQuery({
    queryKey: ["products", filter, page],
    queryFn: () => getProducts({ filter, page }),
    retry: false,
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["products", filter, page + 1],
      queryFn: () => getProducts({ filter, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["products", filter, page - 1],
      queryFn: () => getProducts({ filter, page: page - 1 }),
    });
  }
  return { isLoading, products, error, isError, count };
};

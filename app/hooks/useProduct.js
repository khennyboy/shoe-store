import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../_lib/apiProduct";

export const useProducts = () => {
  const {
    isPending: isLoading,
    data: products,
    error,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: false
  });
  return { isLoading, products, error, isError };
};

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export const cartedProducts = createContext();

export default function Provider({ children }) {
  const [productCarted, setProductCarted] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <cartedProducts.Provider value={{ productCarted, setProductCarted }}>
        {children}
      </cartedProducts.Provider>
    </QueryClientProvider>
  );
}

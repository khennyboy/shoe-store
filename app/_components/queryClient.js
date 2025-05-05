"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export const cartedProduct = createContext();

export default function Provider({ children }) {
  const [cartedItem, setCartedItem] = useState({})
  
  return (
    <QueryClientProvider client={queryClient}>
      <cartedProduct.Provider value={{cartedItem, setCartedItem}}>
        {children}
      </cartedProduct.Provider>
    </QueryClientProvider>
  );
}

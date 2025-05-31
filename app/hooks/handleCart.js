"use client";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { cartedProducts } from "../_components/queryClient";

export default function useHandleCart() {
  const mainContext = useContext(cartedProducts);

  useEffect(() => {
    const cartedProduct =
      JSON.parse(localStorage.getItem("cartedProduct")) || null;
    if (cartedProduct) {
      mainContext.setProductCarted(cartedProduct);
    }
  }, []);

  const handleAddToCart = (e, product) => {
    const updatedCart = [
      ...mainContext.productCarted,
      { ...product, quantity: 1 },
    ];
    mainContext.setProductCarted(updatedCart);
    localStorage.setItem("cartedProduct", JSON.stringify(updatedCart));

    console.log("cartedProduct:", mainContext.productCarted);
    toast.success("cart added suucessfully");
  };

  const handleQuantity = (e, product, type) => {
    const updatedCart = mainContext.productCarted.map((item) => {
      if (item.id === product.id) {
        const quantity =
          type === "plus"
            ? item.quantity + 1
            : item.quantity > 1
              ? item.quantity - 1
              : item.quantity;
        return { ...item, quantity }; // ✅ return updated product
      }
      return item;  // ✅ return product unchanged
    });

    mainContext.setProductCarted(updatedCart);
    localStorage.setItem("cartedProduct", JSON.stringify(updatedCart));
  };

  return { handleAddToCart, handleQuantity };
}

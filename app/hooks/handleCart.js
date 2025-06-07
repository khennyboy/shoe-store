"use client";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { cartedProducts } from "../_components/queryClient";

export default function useHandleCart() {
  const mainContext = useContext(cartedProducts);

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
      return item; // ✅ return product unchanged
    });

    mainContext.setProductCarted(updatedCart);
    localStorage.setItem("cartedProduct", JSON.stringify(updatedCart));
  };

  const handleDeleteCart = (e, product) => {
    const updatedCart = mainContext.productCarted.filter(
      (each) => each.id !== product.id,
    );

    mainContext.setProductCarted(updatedCart);
    localStorage.setItem("cartedProduct", JSON.stringify(updatedCart));
  };

  const totalPrice = mainContext.productCarted
    .map((each) => each.quantity * (each.price * ((100 - each.discount) / 100)))
    .reduce((total, value) => total + value, 0);

  return { handleAddToCart, handleQuantity, handleDeleteCart, totalPrice };
}

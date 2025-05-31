"use client";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { cartedProducts } from "../_components/queryClient";

export default function useHandleCart() {
  const mainContext = useContext(cartedProducts);

  useEffect(()=>{
    const cartedProduct = JSON.parse(localStorage.getItem('cartedProduct')) || null
    if (cartedProduct){
      mainContext.setProductCarted(cartedProduct)
    }
  },[])

  const handleAddToCart = (e, product) => {
    const updatedCart = [...mainContext.productCarted, product];
    mainContext.setProductCarted(updatedCart);
    localStorage.setItem("cartedProduct", JSON.stringify(updatedCart));

    console.log("cartedProduct:", mainContext.productCarted);
    toast.success("cart added suucessfully");
  };

  return handleAddToCart;
}

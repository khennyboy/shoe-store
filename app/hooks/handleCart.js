'use client'
import { useEffect } from "react";

export default function useHandleCart(cartRef) {
  useEffect(() => {
    let cartRefTag = cartRef.current;
    function addCart() {
      console.log("hello");
    }
    cartRefTag.addEventListener("click", addCart);
    return () => {
      cartRefTag.removeEventListener("click", addCart);
    };
  }, [cartRef]);
}

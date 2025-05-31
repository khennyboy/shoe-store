"use client";
import Link from "next/link";
import { useContext } from "react";
import { IoCart } from "react-icons/io5";
import { cartedProducts } from "./queryClient";

export default function Cart() {
  const mainContext = useContext(cartedProducts);
  return (
    <Link href="/cart" className="relative cursor-pointer">
      <IoCart className="size-7 fill-orange-500" />
      {mainContext.productCarted.length !== 0 && (
        <span className="absolute -top-1 left-2/4 rounded-2xl bg-orange-600 px-2  py-0.5 text-center leading-3.5 text-[10px] text-white ">
          {mainContext.productCarted.length}
        </span>
      )}
    </Link>
  );
}

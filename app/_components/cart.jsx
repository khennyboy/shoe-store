"use client";
import Link from "next/link";
import { useContext } from "react";
import { IoCart } from "react-icons/io5";
import { cartedProduct } from "./queryClient";

export default function Cart() {
  const { name } = useContext(cartedProduct);

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <IoCart className="size-7 fill-orange-500" />
      <span className="absolute -top-1 left-2/4 text-center px-1 py-0.5 rounded-2xl bg-orange-600 text-[10px] text-white">
        20
      </span>
    </Link>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { IoCart } from "react-icons/io5";
import useHandleCart from "../hooks/handleCart";
import { cartedProducts } from "./queryClient";
import { useContext } from "react";
import minus from "@/public/icon-minus.svg";
import plus from "@/public/icon-plus.svg";
import { formatCurrency } from "../utils/helpers";

export default function AllProduct({ products }) {
  const { handleAddToCart, handleQuantity } = useHandleCart();
  const mainContext = useContext(cartedProducts);

  return (
    <>
      {products?.map((each) => {
        const isInCart = mainContext.productCarted.find(
          (eachCart) => eachCart.id === each.id,
        );

        return (
          <div
            key={each.id}
            className="group shadow-sm2 cursor-pointer space-y-2 rounded-md px-1 py-1 shadow-gray-200"
          >
            <Link href={`/product/${each.id}`}>
              <div className="grid h-52 items-center">
                <div className="relative h-[90%]">
                  <Image
                    quality={70}
                    src={each.image[0]}
                    alt="product-image"
                    fill
                    loading="lazy"
                    className="cursor-zoom-in rounded-md object-cover"
                  />
                </div>
              </div>

              <div>
                <span className="block text-base leading-normal text-gray-800 lg:text-base">
                  {each.name}-{each.category}
                </span>
                <span className="block text-sm leading-tight font-semibold">
                  {formatCurrency(each.price * ((100 - each.discount) / 100))}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm line-through opacity-60">
                    {formatCurrency(each.price)}
                  </span>
                  <span className="bg-pale-orange text-dark-orange px-[6px] py-[2px] text-sm">
                    -{each.discount}%
                  </span>
                </div>
              </div>
            </Link>

            {/* Cart Control or Add to Cart */}
            {isInCart ? (
              <div className="mt-3 flex items-center rounded-lg bg-gray-200">
                <button
                  onClick={(e) => handleQuantity(e, each, "minus")}
                  className="cursor-pointer px-4 py-4"
                >
                  <Image src={minus} alt="minus-icon" />
                </button>
                <span className="flex-1 text-center">
                  {isInCart?.quantity || 1}
                </span>
                <button
                  onClick={(e) => handleQuantity(e, each, "plus")}
                  className="cursor-pointer px-4 py-4"
                >
                  <Image src={plus} alt="plus-icon" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => handleAddToCart(e, each)}
                className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-center text-sm font-medium text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1 sm:py-2.5"
              >
                <IoCart className="size-7 fill-gray-300" />
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

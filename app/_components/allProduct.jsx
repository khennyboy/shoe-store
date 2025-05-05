import Image from "next/image";
import Link from "next/link";
import { IoCart } from "react-icons/io5";
import useHandleCart from "../hooks/handleCart";
import { useRef } from "react";

export default function AllProduct({ product }) {
  const cartRef = useRef(null);
  useHandleCart(cartRef);
  return (
    <>
      {product?.map((each, index) => (
        <Link
          href={`/product/${each.id}`}
          key={each.id}
          className="group shadow-sm2 cursor-pointer space-y-2 rounded-md px-1 py-1 shadow-gray-200"
        >
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
              {each.name}-{each.id}
            </span>
            <span className="block text-sm leading-tight font-semibold">
              <span className="mr-2">₦</span>
              {each.price * ((100 - each.discount) / 100)}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm line-through opacity-60">
                ₦{each.price}
              </span>
              <span className="bg-pale-orange text-dark-orange px-[6px] py-[2px] text-sm">
                -{each.discount}%
              </span>
            </div>
          </div>

          <button
            ref={cartRef}
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-center text-sm font-medium text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1 sm:py-3"
          >
            <IoCart className="size-7 fill-gray-300" />
            Add to Cart
          </button>
        </Link>
      ))}
    </>
  );
}

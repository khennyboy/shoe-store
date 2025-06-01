"use client";
import Image from "next/image";
import { CgTrashEmpty } from "react-icons/cg";
import { cartedProducts } from "@/app/_components/queryClient";
import { useContext } from "react";
import useHandleCart from "@/app/hooks/handleCart";
import useHandleCheckout from "@/app/hooks/handleCheckout";
import { formatCurrency } from "@/app/utils/helpers";
import Link from "next/link";

export default function CartedItem() {
  const mainContext = useContext(cartedProducts);
  const { handleDeleteCart, totalPrice, handleQuantity } = useHandleCart();
  console.log(totalPrice, mainContext.productCarted);
  const { handleCheckout } = useHandleCheckout();

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-8 md:grid-cols-5">
      <div className="w-full max-w-lg space-y-4 justify-self-center rounded-lg bg-gray-100 px-2 py-8 md:col-span-3 md:px-4">
        <h2 className="border-b-2 border-b-gray-200 pb-2 font-semibold opacity-70">
          Cart ({mainContext.productCarted?.length})
        </h2>
        {mainContext.productCarted.map((each, index) => (
          <div key={index} className="border-b-2 border-b-gray-300 pb-4">
            <div className="mb-3 flex justify-between gap-2">
              <Image
                height={100}
                width={100}
                src={each?.image[0]}
                alt="product"
                className="w-16 shrink-0 self-start rounded-[10px] object-cover"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo earum quaerat officia... {each.id}
              </p>
              <div>
                <div className="mb-2 block text-right text-sm font-semibold">
                  {formatCurrency(each.price * ((100 - each.discount) / 100))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through opacity-60">
                    {formatCurrency(each.price)}
                  </span>
                  <span className="bg-pale-orange text-dark-orange rounded-sm px-[6px] py-[2px] text-sm">
                    -{each.discount}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => handleDeleteCart(e, each)}
                className="flex cursor-pointer items-center gap-1 text-sm text-orange-500"
              >
                <CgTrashEmpty />
                <span>Remove</span>
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleQuantity(e, each, "minus")}
                  className="cursor-pointer rounded-sm bg-gray-400 px-3 py-0.5 text-white"
                >
                  -
                </button>
                <span className="text-sm">{each.quantity}</span>
                <button
                  onClick={(e) => handleQuantity(e, each, "plus")}
                  className="cursor-pointer rounded-sm bg-orange-500 px-3 py-0.5 text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-96 space-y-4 divide-y-2 divide-gray-300 justify-self-center rounded-lg bg-gray-100 px-2 py-8 *:not-last:pb-2 md:col-span-2 md:px-4">
        <h3 className="text-sm font-bold">CART SUMMARY</h3>
        <div className="mb-6 flex items-center justify-between font-bold">
          <h3>SubTtotal</h3>
          <div className="block text-sm leading-tight">
            {formatCurrency(2300)}
          </div>
        </div>
        <Link
          href="/payment"
          // onClick={() => handleCheckout()}
          className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-3 text-center text-sm font-bold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1"
        >
          Checkout ({formatCurrency(totalPrice)})
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import minus from "@/public/icon-minus.svg";
import plus from "@/public/icon-plus.svg";
import cart from "@/public/icon-cart.svg";
import { IoCart } from "react-icons/io5";

export default function Detail2() {
  return (
    // <div className="">
    <div className="mx-auto max-w-lg space-y-3 sm:space-y-5">
      <p className="text-xl font-bold text-dark-orange">SoleMate Company</p>
      <h3 className="text-xl font-semibold leading-tight">
        Fall Limited Edition <br className="sm:hidden" /> Sneakers
      </h3>
      <p className="leading-tight">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole. they'll withstand anything the
        weather can offer.
      </p>
      <div className="flex justify-between font-semibold">
        <div className="flex items-center gap-3">
          <span id="discountPrice" className="">
            ₦2500
          </span>
          <span
            id="discount"
            className="rounded-md bg-gray-200 p-1 text-sm text-orange-500"
          >
            25%
          </span>
        </div>
        <div>
          <span id="actualPrice" className="line-through opacity-50">
            ₦1400
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="mt-4 flex items-center rounded-lg bg-gray-200 py-3 sm:mt-0">
          <button className="px-4">
            <Image src={minus} alt="minus-icon" />
          </button>
          <span className="flex-1 text-center">23</span>
          <button className="px-4">
            <Image src={plus} alt="plus-icon" />
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-dark-orange py-3 font-semibold text-white ring-dark-orange ring-offset-2 ring-offset-white transition-all duration-200 ease-linear hover:bg-dark-orange/80 focus:ring-1 cursor-pointer">
           <IoCart className="size-7 fill-gray-300" />
          Add to cart
        </button>
      </div>
    </div>
    // </div>
  );
}

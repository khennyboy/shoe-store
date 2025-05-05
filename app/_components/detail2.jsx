import Image from "next/image";
import minus from "@/public/icon-minus.svg";
import plus from "@/public/icon-plus.svg";
import { IoCart } from "react-icons/io5";

export default function Detail2({ data }) {
  return (
    <div className="mx-auto max-w-lg space-y-3 sm:space-y-5">
      <p className="text-dark-orange text-xl font-bold">SoleMate Company</p>
      <h3 className="text-xl leading-tight font-semibold">
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
            {data.price * ((100 - data.discount) / 100)}
          </span>
          <span
            id="discount"
            className="rounded-md bg-gray-200 p-1 text-sm text-orange-500"
          >
            -{data.discount}%
          </span>
        </div>
        <div>
          <span id="actualPrice" className="line-through opacity-50">
            {data.price}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="mt-4 flex items-center rounded-lg bg-gray-200 py-3 sm:mt-0">
          <button className="cursor-pointer px-4">
            <Image src={minus} alt="minus-icon" />
          </button>
          <span className="flex-1 text-center">23</span>
          <button className="cursor-pointer px-4">
            <Image src={plus} alt="plus-icon" />
          </button>
        </div>
        <button className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 flex cursor-pointer items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1">
          <IoCart className="size-7 fill-gray-300" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

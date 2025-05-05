import Image from "next/image";
import produt1 from "@/public/image-product-2.jpg";
import { CgTrashEmpty } from "react-icons/cg";

export default function CartedItem() {
  
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-8 md:grid-cols-5">
      <div className="w-full max-w-lg space-y-4 justify-self-center rounded-lg bg-gray-100 px-2 py-8 md:col-span-3 md:px-4">
        <h2 className="border-b-2 border-b-gray-200 pb-2 font-semibold opacity-70">
          Cart (20)
        </h2>
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <div key={index} className="border-b-2 border-b-gray-300 pb-4">
              <div className="mb-3 flex justify-between gap-2">
                <Image
                  src={produt1}
                  alt="product"
                  className="w-16 rounded-[10px] object-cover shrink-0 self-start"
                />
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo earum quaerat officia, omnis iure cupiditate
                  obcaecati temporibus numquam saepe laudantium qui minus esse
                  maxime dolores odit laborum porro eligendi in?{index}
                </p>

                <div>
                  <div className="mb-2 block text-right text-sm leading-tight font-semibold">
                    <span className="mr-2">₦</span>
                    2,300
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm line-through opacity-60">
                      ₦1400
                    </span>
                    <span className="bg-pale-orange text-dark-orange rounded-sm px-[6px] py-[2px] text-sm">
                      -23%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button className="flex cursor-pointer items-center gap-1 text-sm text-orange-500">
                  <CgTrashEmpty />
                  <span>Remove</span>
                </button>
                <div className="flex items-center gap-4">
                  <button className="cursor-pointer rounded-sm bg-gray-400 px-3 py-0.5 text-white">
                    -
                  </button>
                  <span className="text-sm">2</span>
                  <button className="cursor-pointer rounded-sm bg-orange-500 px-3 py-0.5 text-white">
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-4 divide-y-2 divide-gray-300 justify-self-center max-w-96 w-full rounded-lg bg-gray-100 px-2 py-8 *:not-last:pb-2 md:col-span-2 md:px-4">
        <h3 className="text-sm font-bold">CART SUMMARY</h3>
        <div className="mb-6 flex items-center justify-between font-bold">
          <h3>SubTtotal</h3>
          <div className="block text-sm leading-tight">
            <span className="mr-2">₦</span>
            2,300
          </div>
        </div>
        <button className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-3 text-center text-sm font-bold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1">
          Checkout (₦ 130,000)
        </button>
      </div>
    </div>
  );
}

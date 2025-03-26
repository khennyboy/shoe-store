"use client";
import Image from "next/image";
import Pagination from "../_components/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../utils/constant";
import { useEffect } from "react";
import Link from "next/link";
import produt1 from "@/public/image-product-2.jpg";
import { IoCart } from "react-icons/io5";
import toast from "react-hot-toast";

export default function Dummy() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Fixed dummy data
  const products = [
    { id: 1, name: "Product One", price: 1000, discount: 10 },
    { id: 2, name: "Product Two", price: 2000, discount: 15 },
    { id: 3, name: "Product Three", price: 3000, discount: 20 },
    { id: 4, name: "Product Four", price: 4000, discount: 25 },
    { id: 5, name: "Product Five", price: 5000, discount: 30 },
  ];

  let currentPage = Number(searchParams.get("page")) || 1;
  let pageCount = Math.ceil((products?.length || 0) / PAGE_SIZE);

  useEffect(() => {
    if (currentPage > pageCount && pageCount > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageCount);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    if (currentPage <= 0) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentPage, pageCount, router, pathname, searchParams]);

  const product = products?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="bg-gray-100 px-2 py-8 md:px-4">
      <div className="sm2:grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5">
        {product?.map((each, index) => (
          <Link
            href={`/product/${each.id}`}
            key={each.id}
            className="shadow-sm2 cursor-pointer space-y-2 rounded-md px-1 py-1 shadow-gray-200"
          >
            <div className="grid h-52 items-center">
              <div className="relative h-[90%]">
                <Image
                  quality={70}
                  src={produt1}
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
                <span className="bg-PaleOrange text-dark-orange px-[6px] py-[2px] text-sm">
                  -{each.discount}%
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("hello");
                }}
                className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 sm:py-3 lg:font-bold"
              >
                <IoCart className="size-7 fill-gray-300" />
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {product?.length > 0 && <Pagination count={products.length} />}
    </div>
  );
}

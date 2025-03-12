"use client";
import Image from "next/image";
import Pagination from "../_components/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../utils/constant";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProduct";
import Loader from "../loading";
import Link from "next/link";

export default function HomePage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { products = [], isLoading, error, isError } = useProducts();
  console.log(products);

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

  const product = products?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (isLoading)
    return (
      <div className="flex h-56 items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) {
    return (
      <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
        {error?.message || "An error occurred"} Products can&#39;t be loaded
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-2 py-8 md:px-4">
      <div className="grid gap-4 sm2:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5">
        {product?.map((each, index) => (
          <Link 
            href={`/product/${each.id}`}
            key={each.id}
            className="cursor-pointer space-y-2 rounded-md px-1 py-1 shadow-sm2 shadow-gray-200"
          >
            <div className="grid h-52 items-center">
              <div className="relative h-[90%]">
                <Image
                  quality={70}
                  src={each.image?.[0] || "/placeholder.png"}
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
              <span className="block text-sm font-semibold leading-tight">
                <span className="mr-2">₦</span>
                {each.price * ((100 - each.discount) / 100)}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm line-through opacity-60">₦{each.price}</span>
                <span className="bg-PaleOrange px-[6px] py-[2px] text-sm text-dark-orange">
                  -{each.discount}%
                </span>
              </div>
            </div>

            <div>
              <button className="flex w-full items-center justify-center gap-3 rounded-md bg-dark-orange py-2 text-center text-sm font-semibold text-white ring-dark-orange ring-offset-2 ring-offset-white transition-all duration-200 ease-linear hover:bg-dark-orange/80 focus:ring-1 sm:py-3 lg:font-bold">
                <Image src="/icon-cart.svg" 
                  width={30}
                  height={30}
                  alt="cart-icon" 
                  className="hidden sm:block" />
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Ensure Pagination only renders if products exist */}
      {product?.length > 0 && <Pagination count={products.length} />}
    </div>
  );
}

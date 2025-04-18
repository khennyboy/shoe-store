"use client";
import Pagination from "../_components/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../utils/constant";
import { useEffect } from "react";
import { useProducts } from "../hooks/handleProduct";
import Loader from "../loading";
import Dummy from "../_components/dummy";
import AllProduct from "../_components/allProduct";
import { useSession } from "../hooks/handleSession";

export default function HomePage() {
  const { session } = useSession();
  console.log(session, "session");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { products = [], isLoading, error, isError } = useProducts();

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

  if (isLoading)
    return (
      <div className="flex h-56 items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) {
    return (
      // <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
      //   {error?.message || "An error occurred"} Products can&#39;t be loaded
      // </div>
      <div>
        <Dummy />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-2 py-8 md:px-4">
      <div className="sm2:grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5">
        <AllProduct product={product} />
      </div>

      {product?.length > 0 && <Pagination count={products.length} />}
    </div>
  );
}

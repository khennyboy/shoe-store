"use client";
import Pagination from "../_components/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useProducts } from "../hooks/handleProduct";
import Loader from "../loading";
import AllProduct from "../_components/allProduct";
import { toast } from "react-toastify";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products = [], isLoading, isError, error, count } = useProducts();


  useEffect(() => {
    const loggedIn = searchParams.get("loggedIn");
    const payment = searchParams.get("redirect");

    if (loggedIn === "true") {
      toast.success("Login successful!");
      const params = new URLSearchParams(searchParams);
      params.delete("loggedIn");
    }
    if (payment) {
      router.replace(`/payment`, { scroll: false });
    }
  }, [searchParams, router]);

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
      <div className="sm2:grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5">
        <AllProduct products={products} />
      </div>

      {products?.length > 0 && <Pagination count={count} />}
    </div>
  );
}

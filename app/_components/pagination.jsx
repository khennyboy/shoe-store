"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "../utils/constant";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Pagination({ count }) {
  console.log(count)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageCount = Math.ceil(count / PAGE_SIZE);
  const currentPage = Number(searchParams.get("page")) || 1;

  const updatePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const nextPage = () => {
    if (currentPage < pageCount) {
      updatePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  if (pageCount <= 1) return null;

  return (
    <div className="mx-auto flex w-[95%] justify-center sm:w-[70%] lg:w-1/2">
      <div className="paginate mt-10 grid auto-cols-[32px] grid-flow-col gap-2 overflow-x-auto py-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex aspect-square items-center justify-center bg-dark-orange text-sm font-medium text-white transition-all duration-200 ease-linear hover:bg-DarkOrange/70 ${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <GrFormPrevious size={20} />
        </button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => updatePage(index + 1)}
            disabled={currentPage === index + 1}
            className={`aspect-square text-sm font-medium text-white transition-all duration-200 ease-linear hover:bg-dark-orange ${
              currentPage === index + 1
                ? "cursor-not-allowed bg-dark-orange"
                : "cursor-pointer bg-dark-orange/50"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`flex aspect-square items-center justify-center bg-dark-orange text-sm font-medium text-white transition-all duration-200 ease-linear hover:bg-DarkOrange/70 ${
            currentPage === pageCount ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <GrFormNext size={20} />
        </button>
      </div>
    </div>
  );
}

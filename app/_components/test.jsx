"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Test() {
  const [count, setCount] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <button
        className="rounded-md bg-yellow-300 px-3"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </button>
      <button
        className="cursor-pointer"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("number", 1);
          // router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }}
      >
        Click me to set number
      </button>
    </div>
  );
}

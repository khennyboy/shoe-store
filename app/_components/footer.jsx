"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Collections", path: "/" },
  { name: "Men", path: "/?filter=men" },
  { name: "Women", path: "/?filter=women" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-700 px-4 py-12 text-white md:px-8 xl:px-12">
      <div className="grid grid-cols-1 grid-rows-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div className="pr-4">
          <h2 className="mb-2 text-lg font-bold md:mb-4 md:text-xl">
            SoleMate
          </h2>
          <p className="text-gray-400">
            Step into comfort and style. Find your perfect fit with us.
          </p>
        </div>

        <div className="">
          <h3 className="mb-2 font-semibold md:mb-4 md:text-lg">Quick Links</h3>
          <ul className="space-y-1">
            {navLinks.map((each, index) => {
              const isFilter = searchParams.get("filter");
              const isActive =
                (each.path === pathname && each.name !== "Collections") ||
                (each.name === "Collections" &&
                  isFilter === null &&
                  each.path === pathname) ||
                (each.name === "Men" && isFilter === "men") ||
                (each.name === "Women" && isFilter === "women");
              return (
                <li key={index}>
                  <Link
                    href={each.path}
                    className={`transition-all duration-200 ease-linear hover:opacity-100 ${isActive ? "opacity-100" : "opacity-70"}`}
                  >
                    {each.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-span-full md:col-span-1">
          <h3 className="mb-2 font-semibold md:mb-4 md:text-lg">Contact Us</h3>
          <p className="leading-tight text-gray-400">
            1, ola-oluwa street papa ashafa Agege, Lagos State
          </p>
          <p className="tracking-tighter text-gray-400 lg:tracking-normal">
            <a href="mailto:abdullateefkehinde848@gmail.com">
              abdullateefkehinde848@gmail.com
            </a>
          </p>
          <p className="text-gray-400">Phone: +234 702 6771 744</p>

          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <i className=""></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <i className=""></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <i className=""></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center sm:mt-8">
        <p className="text-sm text-gray-400">
          &copy; {time} SoleMate. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

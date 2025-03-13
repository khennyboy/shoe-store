"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Cart from "./cart";
import Login from "./login";
import useNav from "../hooks/navhooks";
import Profile from "./profile";
import { GrClose, GrMenu } from "react-icons/gr";

const navLinks = [
  { name: "Collections", path: "/" },
  { name: "Adidas", path: "/?filter=adidas" },
  { name: "Nike", path: "/?filter=adidas" },
  { name: "Puma", path: "/?filter=puma" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const searchParams = useSearchParams();

  const toggleIcon = useCallback((event) => {
    event.stopPropagation();
    setOpenNav((prev) => !prev);
  }, []);

  useNav({
    openNav,
    setOpenNav,
    navRef,
  });

  return (
    <nav
      ref={navRef}
      className="fixed left-0 top-0 z-[1000] flex w-full items-center gap-4 bg-white px-4 py-2 shadow-md sm:gap-4 md:px-8 md:py-0 lg:gap-8 xl:gap-10 xl:px-12"
    >
      <button
        className={`cursor-pointer p-2 md:hidden ${openNav ? "fixed right-[40%] top-6 z-[150]" : "relative right-0 top-0 z-0"}`}
        onClick={(event) => toggleIcon(event)}
        aria-expanded={openNav}
      >
        {openNav ? (
          <GrClose className="stroke-white" />
        ) : (
          <GrMenu className="" />
        )}
      </button>

      <h1 className="flex-1 text-[1.3rem] font-bold md:flex-initial">
        SoleMate
      </h1>

      <div
        className={`fixed left-0 top-0 items-center gap-1 overflow-hidden transition-transform duration-200 ease-linear sm:gap-6 md:relative md:top-0 md:flex md:h-fit md:w-fit md:flex-1 md:scale-100 lg:gap-2 ${
          openNav
            ? "z-[100] w-[80%] scale-100 space-y-2 bg-dark-orange px-8 py-12 shadow-md"
            : "h-0 w-0 scale-0"
        }`}
        style={{
          transformOrigin: "top center",
        }}
      >
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
            <div
              className={`relative border-b-2 py-2 text-start font-medium text-white md:w-fit md:border-b-0 md:py-5 md:text-black lg:py-6 ${isActive ? "border-b-white/80" : "border-b-white/20"}`}
              key={index}
            >
              <Link
                className={`relative transition-all duration-300 ease-linear after:w-full hover:opacity-100 hover:after:h-fit md:p-4 md:px-2 md:after:py-4 md:hover:after:absolute md:hover:after:inset-0 md:hover:after:-z-50 md:hover:after:m-auto md:hover:after:rounded md:hover:after:bg-gray-100 md:hover:after:py-4 lg:px-4 ${isActive ? "opacity-70" : "opacity-100"}`}
                href={each.path}
                onClick={() => {
                  if (openNav) {
                    setOpenNav(false);
                  }
                }}
              >
                {each.name}
              </Link>
              <div
                className={`left-0 md:absolute md:bottom-0 md:h-[2px] md:w-full ${isActive ? "md:bg-dark-orange" : ""}`}
              ></div>
            </div>
          );
        })}
      </div>

      <Cart />
      <Profile />
      <Login />
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { CgAdidas } from "react-icons/cg";
import { GrClose, GrMenu } from "react-icons/gr";
import { SiNike, SiPuma } from "react-icons/si";
import useNav from "../hooks/navhooks";
import Cart from "./cart";
import Login from "./loginlogout";
import Profile from "./profile";

const navLinks = [
  { name: "Collections", path: "/" },
  { name: "adidas", path: "/?filter=adidas", icon: <CgAdidas /> },
  { name: "nike", path: "/?filter=nike", icon: <SiNike /> },
  { name: "puma", path: "/?filter=puma", icon: <SiPuma /> },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navRef = useRef(null);

  const toggleIcon = useCallback((e) => {
    e.stopPropagation();
    setOpenNav((prev) => !prev);
  }, []);

  useNav({ openNav, setOpenNav, navRef });
  
  const isActiveLink = (link) => {
    const filter = searchParams.get("filter") || '';
    return (
      (link.path === pathname && link.name !== "Collections") ||
      (link.name === "Collections" && !filter && link.path === pathname) ||
      (link.name === "adidas" && filter === "adidas") ||
      (link.name === "nike" && filter === "nike") ||
      (link.name === "puma" && filter === "puma")
    );
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-[1000] flex items-center justify-between gap-4 bg-white px-4 py-2 shadow-md md:px-8 md:py-0"
      aria-label="Main navigation"
    >
      <button
        onClick={toggleIcon}
        aria-label={openNav ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={openNav}
        aria-controls="main-navigation"
        className={`cursor-pointer p-2 text-2xl md:hidden ${openNav ? "fixed top-6 right-[40%] z-[150]" : "relative z-0"}`}
      >
        {openNav ? <GrClose className="stroke-white" /> : <GrMenu />}
      </button>

      <h1 className="flex-auto text-xl font-bold md:flex-initial">SoleMate</h1>

      <ul
        id="main-navigation"
        className={`${
          openNav
            ? "bg-dark-orange fixed top-0 left-0 z-[100] h-screen w-2/3 space-y-2 px-8 py-12 shadow-md"
            : "h-0 w-0 overflow-hidden"
        } transition-width duration-200 ease-linear md:relative md:flex md:h-auto md:w-auto md:items-center md:space-x-4 lg:space-x-8`}
        style={{ transformOrigin: "top center" }}
      >
        {navLinks.map((link, index) => {
          const isActive = isActiveLink(link);
          return (
            <li key={index} className="relative">
              <Link
                href={link.path}
                className={`flex items-center gap-1 py-2 transition-opacity duration-300 md:py-5 ${
                  isActive
                    ? "md:text-dark-orange text-gray-200/80 opacity-70"
                    : "text-gray-200 md:text-black"
                } hover:opacity-100`}
                onClick={() => {
                  if (openNav) setOpenNav(false);
                }}
              >
                <span>{link.name[0].toUpperCase() + link.name.slice(1)}</span>
                {link.icon && <span className="ml-1">{link.icon}</span>}
              </Link>
              {isActive && (
                <div className="bg-dark-orange absolute bottom-0 left-0 hidden h-[2px] w-full md:block"></div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4">
        <Cart />
        <Profile />
        <Login />
      </div>
    </nav>
  );
}

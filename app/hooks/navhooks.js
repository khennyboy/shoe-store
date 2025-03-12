import { useEffect } from "react";

export default function useNav({ openNav, setOpenNav, navRef }) {
  useEffect(() => {
    function closeMenu() {
      if (openNav) {
        setOpenNav(false);
      }
    }

    const handleKeydown = (e) => {
      if (openNav && e.key === "Escape") {
        setOpenNav(false);
      }
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) && openNav) {
        setOpenNav(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", closeMenu);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", closeMenu);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [openNav, setOpenNav, navRef]);
}

"use client";

import Link from "next/link";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useUser } from "../hooks/handleUser";
import useLoginLogout from "../hooks/handleLoginLogout";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const { user } = useUser();
  console.log(user, "user");
  const { logout, isLoggingOut, logoutError, isLogoutError, isLogoutSuccess } =
    useLoginLogout();
  useEffect(() => {
    if (isLogoutSuccess) {
      toast.success("Logout Successful");
    }
    if (isLogoutError) {
      toast.error(logoutError.message);
    }
  }, [isLogoutError, isLogoutSuccess, logoutError]);
  return (
    <>
      {user ? (
        <button
          disabled={isLoggingOut}
          onClick={() => logout()}
          title="logout"
          className="cursor-pointer"
        >
          <IoLogOutOutline className="size-7 stroke-orange-500" />
        </button>
      ) : (
        <Link href="/auth/login">
          <IoLogInOutline className="size-8 stroke-orange-500" />
        </Link>
      )}
    </>
  );
}

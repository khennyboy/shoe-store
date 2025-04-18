"use client";

import Link from "next/link";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useSession } from "../hooks/handleSession";
import useLoginLogout from "../hooks/handleLoginLogout";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const { session } = useSession();
  console.log(session, 'session');
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
      {session ? (
        <button disabled={isLoggingOut} onClick={() => logout()}>
          <IoLogOutOutline className="size-7 stroke-orange-500 cursor-pointer" />
        </button>
      ) : (
        <Link href="/auth/login">
          <IoLogInOutline className="size-8 stroke-orange-500" />
        </Link>
      )}
    </>
  );
}

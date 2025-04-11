"use client";
import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";
export default function Login() {
  return (
    <Link href="/auth/login">
      <IoLogInOutline className="size-8 stroke-orange-500" />
    </Link>
  );
}

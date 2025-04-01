"use client";
import Link from "next/link";
import { useState } from "react";
import { LuMail } from "react-icons/lu";
import { LuLockKeyhole } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  console.log(showPassword.password, "password");
  console.log(showPassword.confirmPassword, "confirmPassword");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-8 w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-orange-500">SoleMate</h1>
        </div>

        <form className="">
          <div className="relative mb-8">
            <input
              type="text"
              className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-4 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              {" "}
              <LuMail /> Email address
            </label>
          </div>

          <div className="relative mb-8">
            <input
              type={showPassword.password ? "text" : "password"}
              className="z-10 w-full rounded-md border-1 border-orange-300 px-2 py-4 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <span
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center px-2 text-gray-500"
            >
              {showPassword.password ? (
                <MdOutlineRemoveRedEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </span>
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              <LuLockKeyhole /> Password
            </label>
          </div>

          <div className="relative mb-8">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              className="z-10 w-full rounded-md border-1 border-orange-300 px-2 py-4 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <span
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center px-2 text-gray-500"
            >
              {showPassword.confirmPassword ? (
                <MdOutlineRemoveRedEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </span>
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              <LuLockKeyhole />
              Confirm Password
            </label>
          </div>

          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-4 outline-none focus:border-2 focus:border-orange-500"
                placeholder=" "
              />
              <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
                {" "}
                # Code
              </label>
            </div>
            <button
              type="button"
              className="border-opacity-100 hover:border-opacity-0 cursor-pointer rounded-md border border-orange-400 px-4 py-4 text-center text-sm text-gray-800 transition-all duration-300 ease-linear hover:shadow-md lg:px-8 lg:text-base"
            >
              Send Code
            </button>
          </div>

          <p className="mb-6 text-sm text-gray-400">
            By signing up or logging in, you consent to SoleMate's{" "}
            <Link href="#" className="text-orange-400">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-orange-400">
              Privacy Policy
            </Link>
            .
          </p>

          <button
            type="submit"
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 mb-2 block w-full cursor-pointer rounded-md py-4 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 lg:font-bold"
          >
            Sign up
          </button>
        </form>

        <Link
          href="/login"
          className="block text-center text-orange-400 transition-all duration-200 ease-linear hover:text-orange-500"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;

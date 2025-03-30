"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoLogIn } from "react-icons/io5";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-2">
      <div className="w-full max-w-md rounded-lg bg-white px-2.5 py-8 shadow-lg">
        <h2 className="text-dark-orange mb-6 text-center text-2xl font-bold">
          Login
        </h2>

        <form className="space-y-6">
          <div>
            <label className="text block font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              required
              className="focus:outline-dark-orange mt-1 w-full rounded-md border-gray-400 px-1 py-4 border-1 focus:border-0 outline-0 focus:outline-2"
            />
          </div>

          <div>
            <label className="text block font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              required
              className="focus:outline-dark-orange mt-1 w-full rounded-md border-gray-400 px-1 py-4 border-1 focus:border-0 outline-0 focus:outline-2"
            />
          </div>

          <button
            type="submit"
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-4 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 sm:py-3 lg:font-bold"
          >
            
            <IoLogIn className="size-8 fill-gray-100"/>
          </button>
        </form>

        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-gray-400"></div>
          <span className="relative bg-white px-3 text-sm">
            or
          </span>
        </div>

        <button className="text-dark-orange flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-4 text-sm font-semibold transition-all hover:bg-gray-200">
          <FcGoogle className="size-5" />
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&#39;t have an account?{" "}
          <Link href="/signup" className="text-dark-orange hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

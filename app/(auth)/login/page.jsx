'use client'
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
 
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-dark-orange">Login</h2>

        <form  className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-dark-orange focus:ring-dark-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-dark-orange focus:ring-dark-orange"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-dark-orange py-2 font-semibold text-white transition-all hover:bg-dark-orange/80"
          >
            Login
          </button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <span className="text-sm text-gray-500">or</span>
        </div>

        <button
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200"
        >
          <FcGoogle/>
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&#39;t have an account? <Link href="/signup" className="text-dark-orange hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

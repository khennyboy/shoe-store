import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-dark-orange focus:ring-dark-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-dark-orange focus:ring-dark-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-dark-orange focus:ring-dark-orange"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-dark-orange py-2 text-white hover:bg-dark-orange/80"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 py-4">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="text-sm text-gray-500">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        <button className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
          <FcGoogle  />
          Sign Up with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-dark-orange hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

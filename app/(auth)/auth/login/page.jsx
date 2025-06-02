"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMail } from "react-icons/lu";
import { LuLockKeyhole } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import Error from "@/app/_components/error";
import useGoogle from "@/app/hooks/handleGoogle";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import useLoginLogout from "@/app/hooks/handleLoginLogout";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { login, isLoggingIn, loginError, isLoginError, isLoginSuccess } =
    useLoginLogout();

  const { loginGoogle } = useGoogle();
  const { errors } = formState;

  function onSubmit(data) {
    login(data);
  }

  // useEffect for handling login button
  useEffect(() => {
    if (isLoginError) {
      toast.error(loginError.message);
    }
    if (isLoginSuccess) {
      toast.success("Login Successful");
      reset();
      router.push(redirect);
    }
  }, [loginError, isLoginError, isLoginSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-500">
          SoleMate
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="mb-6">
            <div className="relative">
              <input
                {...register("email", {
                  required: "This field is required",
                })}
                type="text"
                className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
                placeholder=" "
              />
              <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
                {" "}
                <LuMail /> Phone number / email address
              </label>
            </div>
            <Error error={errors?.email?.message} />
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                {...register("password", {
                  required: "This field is required",
                })}
                type={showPassword ? "text" : "password"}
                className="z-10 w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
                placeholder=" "
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center px-2 text-gray-500"
              >
                {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </span>
              <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
                <LuLockKeyhole /> Password
              </label>
            </div>
            <Error error={errors?.password?.message} />
          </div>

          <p className="mb-8 text-sm text-gray-400">
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
            disabled={isLoggingIn}
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 w-full cursor-pointer rounded-md py-3 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 sm:py-3 lg:font-bold"
          >
            Sign in
          </button>

          <div className="mt-4 flex justify-between text-sm text-orange-400">
            <Link
              href="/passwordrecovery"
              className="transition-all duration-200 ease-linear hover:text-orange-500"
            >
              Forgot password?
            </Link>
            <Link
              href="/auth/signup"
              className="transition-all duration-200 ease-linear hover:text-orange-500"
            >
              Sign up
            </Link>
          </div>
        </form>

        <div className="my-6 flex items-center justify-center text-gray-500">
          <span className="flex-1 border-t border-gray-700"></span>
          <span className="mx-3 text-sm">OR</span>
          <span className="flex-1 border-t border-gray-700"></span>
        </div>

        <button
          onClick={() => loginGoogle()}
          className="border-opacity-100 hover:border-opacity-0 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-orange-400 py-3 text-center text-sm font-medium text-gray-800 transition-all duration-300 ease-linear hover:shadow-md"
        >
          <FcGoogle className="size-5" />
          Log in with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          © 2025 SoleMate.{" "}
          <Link href="/contact" className="text-orange-400">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}

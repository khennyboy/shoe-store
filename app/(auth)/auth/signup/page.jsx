"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMail } from "react-icons/lu";
import { LuLockKeyhole } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useCode from "@/app/hooks/handleCode";
import { toast } from "react-toastify";
import { handleSendCode } from "@/app/_lib/send-code";
import Error from "@/app/_components/error";
import useSignup from "@/app/hooks/handleSignup";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [btn, setBtn] = useState(true);
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  let { errors } = formState;

  const { sendCode, isLoading, error, isError, isSuccess } = useCode();
  const { signup, signupLoading, signupError, signupisError, signupisSuccess } =
    useSignup();

  function onSubmit(data) {
    signup(data);
  }


  useEffect(() => {
    if (isError) {
      toast.error("Error generating OTP!");
    }
    if (isSuccess) {
      toast.success("OTP sent sucessfully");
      setBtn(false);
    }
  }, [isError, error, isSuccess]);

  useEffect(() => {
    if (signupisError) {
      toast.error(signupError.message);
    }
    if (signupisSuccess) {
      toast.success("Sign up successful");
      reset();
      router.push("/auth/login");
    }
  }, [signupisError, signupisSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-8 w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-orange-500">SoleMate</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="mb-6">
            <div className="relative">
              <input
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
                type="email"
                className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
                placeholder=" "
              />
              <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
                {" "}
                <LuMail /> Email address
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
                type={showPassword.password ? "text" : "password"}
                className="z-10 w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
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
            <Error error={errors?.password?.message} />
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Password need to match",
                })}
                type={showPassword.confirmPassword ? "text" : "password"}
                className="z-10 w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
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
            <Error error={errors?.confirmPassword?.message} />
          </div>

          <div className="mb-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="number"
                  maxLength="4"
                  className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
                  placeholder=" "
                  {...register("otp", {
                    required: "This field is required",
                  })}
                />
                <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
                  {" "}
                  # Code
                </label>
              </div>
              <button
                disabled={isLoading}
                onClick={() => handleSendCode(getValues().email, sendCode)}
                type="button"
                className="border-opacity-100 hover:border-opacity-0 cursor-pointer rounded-md border border-orange-400 px-4 py-3 text-center text-sm text-gray-800 transition-all duration-300 ease-linear hover:shadow-md disabled:cursor-not-allowed lg:px-8 lg:text-base"
              >
                {isLoading ? "Sending..." : "Send Code"}
              </button>
            </div>
            <Error error={errors?.otp?.message} />
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
            disabled={btn || signupLoading}
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 mb-2 block w-full cursor-pointer rounded-md py-3 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 disabled:cursor-not-allowed lg:font-bold"
          >
            {signupLoading ? "Signing Up..." : "SIgn Up"}
          </button>
        </form>

        <Link
          href="/auth/login"
          className="block text-center text-orange-400 transition-all duration-200 ease-linear hover:text-orange-500"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;

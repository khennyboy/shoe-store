"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMail } from "react-icons/lu";
import { LuLockKeyhole } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Error from "@/app/_components/error";
import useSignup from "@/app/hooks/handleSignup";
import { useRouter } from "next/navigation";
import { handleSendCode } from "@/app/_lib/send-code";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState, reset, getValues } = useForm();
  let { errors } = formState;

  const { signup, signupLoading, signupError, signupisError, signupisSuccess } =
    useSignup();

  function onSubmit(data) {
    const { email, password } = data;
    const fullOTP = Array.isArray(data.otp) ? data.otp.join("") : data.otp;
    signup({ email, password, fullOTP });
  }

  useEffect(() => {
    if (signupisError) {
      toast.error(signupError.message);
    }
    if (signupisSuccess) {
      router.push("/auth/login");
      toast.success("Sign up successful");
      reset();
    }
  }, [signupisError, signupisSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-8 w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-500">
          SoleMate
        </h1>

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
                    value === getValues().password || "Passwords need to match",
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
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <LuLockKeyhole /> Verification Code
              </label>
              <div className="flex items-center gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    tabIndex={i + 1} // Ensures proper tab order
                    className="h-12 w-12 rounded-md border-2 border-orange-300 text-center text-xl font-medium focus:border-orange-500 focus:outline-none"
                    {...register(`otp.${i}`, {
                      required: "All digits are required",
                      pattern: {
                        value: /^[0-9]$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                    onKeyDown={(e) => {
                      // Only allow numbers
                      if (
                        !e.key.match(/^[0-9]$/) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }

                      // Auto-focus next input on entry
                      if (e.key.match(/^[0-9]$/)) {
                        setTimeout(() => {
                          const nextInput = e.target.nextElementSibling;
                          if (nextInput) nextInput.focus();
                        }, 0);
                      }

                      // Handle backspace
                      if (e.key === "Backspace" && !e.target.value) {
                        const prevInput = e.target.previousElementSibling;
                        if (prevInput) prevInput.focus();
                      }

                      // Handle Tab key
                      if (e.key === "Tab" && !e.shiftKey && !e.target.value) {
                        e.preventDefault();
                        const nextInput = e.target.nextElementSibling;
                        if (nextInput) nextInput.focus();
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <button
                disabled={isLoading || codeSent}
                onClick={() =>
                  handleSendCode(
                    getValues().email,
                    setCodeSent,
                    setCountdown,
                    setIsLoading,
                  )
                }
                type="button"
                tabIndex={5} // After the OTP fields
                className={`border-opacity-100 hover:border-opacity-0 cursor-pointer rounded-md border border-orange-400 px-4 py-3 text-center text-sm text-gray-800 transition-all duration-300 ease-linear hover:shadow-md disabled:cursor-not-allowed lg:px-8 lg:text-base ${
                  codeSent ? "opacity-50" : ""
                }`}
              >
                {isLoading
                  ? "Sending..."
                  : codeSent
                    ? `Resend in ${countdown}s`
                    : "Send Code"}
              </button>
            </div>
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
            disabled={!codeSent || signupLoading}
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 mb-2 block w-full cursor-pointer rounded-md py-3 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 disabled:cursor-not-allowed sm:py-4 lg:font-bold"
          >
            {signupLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <Link
          href="/auth/login"
          className="block text-center text-orange-400 transition-all duration-200 ease-linear hover:text-orange-500"
        >
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { LuLockKeyhole } from "react-icons/lu";
import { useRouter } from "next/navigation";
import supabase from "@/app/_lib/supabase";

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit({ password }) {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      alert("Password updated successfully. You can now log in again.");
      router.push("/auth/login");
    } catch (err) {
      alert(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-8 w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-orange-500">
          Update Password
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-10 max-w-md"
        >
          <div className="mb-6">
            <div className="relative">
              <input
                {...register("password", {
                  required: "This field is required",
                })}
                type={showPassword.password ? "text" : "password"}
                className="z-10 w-full rounded-md border border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
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
                <LuLockKeyhole /> New password
              </label>
            </div>
            {errors?.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="mb-6">
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Passwords need to match",
                })}
                type={showPassword.confirmPassword ? "text" : "password"}
                className="z-10 w-full rounded-md border border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
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
                <LuLockKeyhole /> Confirm new password
              </label>
            </div>
            {errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-orange-500 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

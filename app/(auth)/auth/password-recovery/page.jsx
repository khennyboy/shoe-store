"use client";
import Error from "@/app/_components/error";
import useUpdateUser from "@/app/hooks/handleresetpassword";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa6";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-toastify";

const PasswordrecoveryPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { register, handleSubmit, formState, reset, getValues } = useForm();
  let { errors } = formState;

  const { updateUserData, isUpdating, error, isError, isSuccess } =
    useUpdateUser();

  function onSubmit(data) {
    const { email, password } = data;
    updateUserData({ email, password });
  }

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
    if (isSuccess) {
      router.push("/auth/login");
      toast.success("password reset successful");
      reset();
    }
  }, [isError, isSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-8 w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">
          Password Recovery
        </h2>

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

          

          <button
            type="submit"
            disabled={isUpdating}
            className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 mb-2 block w-full cursor-pointer rounded-md py-3 text-center text-sm font-semibold text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear focus:ring-1 disabled:cursor-not-allowed sm:py-4 lg:font-bold"
          >
            {isUpdating ? "Resetting password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordrecoveryPage;

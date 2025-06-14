"use client";

import useHandleCart from "@/app/hooks/handleCart";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegAddressBook } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { PiPhoneOutgoingThin } from "react-icons/pi";
import { SiNamecheap } from "react-icons/si";
import { userProfile } from "../_lib/apis";
import { useUser } from "../hooks/handleUser";


const PaystackButtonWrapper = dynamic(
  () => import("@/app/_components/paystackbuttonwrapper"),
  { ssr: false },
);

export default function Payment() {
  const router = useRouter();
  const { user } = useUser();
  console.log(user);
  const { data } = userProfile(user.user.id);
  console.log(data);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const { totalPrice: amount } = useHandleCart();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">
          Payment Details
        </h2>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={data?.user.fullname || userDetails.name}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, name: e.target.value }))
              }
              className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              <SiNamecheap /> Fullname
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="email"
              value={data?.user.email || userDetails.email}
              onChange={(e) =>
                setUserDetails((prev) => ({ ...prev, email: e.target.value }))
              }
              className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              <LuMail /> Email
            </label>
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={data?.phoneNumber || userDetails.phoneNumber}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              <PiPhoneOutgoingThin /> Phone Number
            </label>
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={data?.address || userDetails.address}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
              placeholder=" "
            />
            <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
              <FaRegAddressBook /> Delivery Address
            </label>
          </div>
        </div>

        <PaystackButtonWrapper
          email={userDetails.email}
          amount={amount}
          name={userDetails.name}
          phone={userDetails.phoneNumber}
          publicKey={publicKey}
          address={userDetails.address}
        />

      </div>
    </div>
  );
}

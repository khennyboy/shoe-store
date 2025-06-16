"use client";

import useHandleCart from "@/app/hooks/handleCart";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaRegAddressBook } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { PiPhoneOutgoingThin } from "react-icons/pi";
import { SiNamecheap } from "react-icons/si";
import { useUser } from "../hooks/handleUser";
import useProfile from "../hooks/handleProfile";
import { saveUserData, updateUserName } from "../_lib/apis";
import AuthGuard from "./authguard";

const PaystackButtonWrapper = dynamic(
  () => import("@/app/_components/paystackbuttonwrapper"),
  { ssr: false },
);

export default function Payment() {
  const { user } = useUser();
  console.log(user);
  const { profile } = useProfile(user?.user.id);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone_number: '',
    address:'',
  });

  const { totalPrice: amount } = useHandleCart();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  useEffect(() => {
    if (user && profile) {
      setUserDetails({
        name: user?.user?.user_metadata?.full_name || "",
        email: user?.user?.email || "",
        phone_number: profile?.phone_number || "",
        address: profile?.address || "",
      });
    }
  }, [user, profile]);

  return (
    <AuthGuard>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-lg rounded-lg bg-gray-100 px-4 py-8 shadow-md md:px-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">
            Payment Details
          </h2>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) => {
                  const value = e.target.value;
                  updateUserName(value);
                  setUserDetails((prev) => ({ ...prev, name: e.target.value }));
                }}
                className="z-10 block w-full rounded-md border-1 border-orange-300 px-2 py-3 outline-none focus:border-2 focus:border-orange-500"
                placeholder=" "
              />
              <label className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-gray-500">
                <SiNamecheap /> Fullname
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6 rounded-md border-1 border-orange-300 px-2 py-3 outline-none hover:border-orange-500 focus:border-2">
            {userDetails.email}
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="tel"
                maxLength="11"
                value={userDetails.phone_number}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserDetails((prev) => ({ ...prev, phone_number: value }));
                  saveUserData({
                    type: "phone_number",
                    phone_number: value,
                    id: user.user.id,
                  });
                }}
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
                value={userDetails.address}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserDetails((prev) => ({ ...prev, address: value }));
                  saveUserData({
                    type: "address",
                    address: value,
                    id: user.user.id,
                  });
                }}
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
            address={userDetails.address}
            phone_number={userDetails.phone_number}
            publicKey={publicKey}
          />
        </div>
      </div>
    </AuthGuard>
  );
}

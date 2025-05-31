"use client";

import { useState } from "react";
import dynamic from "next/dynamic";


const PaystackButtonWrapper = dynamic(
  () => import("@/app/_components/paystackbuttonwrapper"),
  { ssr: false }
);

export default function Payment() {
  const [phone, setPhone] = useState("07026771744");
  const [address, setAddress] = useState("");
  const amount = 10000; // Amount in Kobo
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Payment Details</h2>

      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="font-semibold">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter your full name"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="font-semibold">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter your email address"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="phone" className="font-semibold">Phone</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="address" className="font-semibold">Delivery Address</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter your delivery address"
          rows={3}
        />
      </div>

      <PaystackButtonWrapper
        email={email}
        amount={amount}
        name={name}
        phone={phone}
        publicKey={publicKey}
        address={address} 
      />
    </div>
  );
}

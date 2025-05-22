"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

// Dynamically import PaystackButtonWrapper to avoid SSR issues
const PaystackButtonWrapper = dynamic(
  () => import("@/app/_components/payment"),
  { ssr: false }
);

export default function Payment() {
  const [email, setEmail] = useState("abdullateefkehinde848@gmail.com");
  const [name, setName] = useState("Sheriff");
  const [phone, setPhone] = useState("07026771744");
  const amount = 100000; // Amount in Kobo
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  return (
    <div>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2"
        />
      </div>

      <PaystackButtonWrapper
        email={email}
        amount={amount}
        name={name}
        phone={phone}
        publicKey={publicKey}
      />
    </div>
  );
}

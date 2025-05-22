"use client";

import { PaystackButton } from "react-paystack";

export default function PaystackButtonWrapper({
  email,
  amount,
  name,
  phone,
  publicKey,
}) {
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => alert("Payment Successful!"),
    onClose: () => alert("Payment Closed"),
  };

  return <PaystackButton {...componentProps} className="cursor-pointer" />;
}

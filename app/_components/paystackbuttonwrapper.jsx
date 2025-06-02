'use client';

import { PaystackButton } from "react-paystack";
import { formatCurrency } from "../utils/helpers";

export default function PaystackButtonWrapper({
  email,
  amount,
  name,
  phone,
  address,
  publicKey,
}) {
  const componentProps = {
    email,
    amount: Number(amount) * 100,
    metadata: {
      name,
      phone,
      address, 
    },
    publicKey,
    text: `${formatCurrency(amount)} Pay Now`,
    onSuccess: () => alert("Payment Successful!"),
    onClose: () => alert("Payment Closed"),
  };

  // Don't render button unless required fields are present
  if (!email || !amount || !name || !address) return null;

  return (
    <PaystackButton
      {...componentProps}
      className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-center text-sm font-medium text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1 sm:py-2.5"
    />
  );
}

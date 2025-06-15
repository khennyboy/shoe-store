"use client";

import { PaystackButton } from "react-paystack";
import { formatCurrency } from "../utils/helpers";
import { useUser } from "../hooks/handleUser";
import useProfile from "../hooks/handleProfile";
import { useRouter } from "next/navigation";

export default function PaystackButtonWrapper({
  amount,
  publicKey,
  email,
  phone_number,
  name,
  address,
}) {
  const { user } = useUser();
  const { profile } = useProfile(user.user.id);
  const router = useRouter()
  const componentProps = {
    email: user.user.email,
    amount: 100,
    metadata: {
      name: user?.user.user_metadata.full_name,
      phone_number: profile?.phone_number,
      address: profile?.address,
    },
    publicKey,
    text: `${formatCurrency(amount)} Pay Now`,
    onSuccess: (response) => {
      router.push(`/payment/success?reference=${response.reference}`);
    },
    onClose: () => alert("Payment Closed"),
  };

  if (!email || !phone_number || !name || !address) return null;

  return (
    <PaystackButton
      {...componentProps}
      className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-center text-sm font-medium text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1 sm:py-2.5"
    />
  );
}


// Number(amount) * 100,
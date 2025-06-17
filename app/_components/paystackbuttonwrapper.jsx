"use client";

import { PaystackButton } from "react-paystack";
import { formatCurrency } from "../utils/helpers";
import { useUser } from "../hooks/handleUser";
import useProfile from "../hooks/handleProfile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PaystackButtonWrapper({
  amount,
  publicKey
}) {
  const { user } = useUser();
  const { profile } = useProfile(user?.user.id);
  const router = useRouter()
  const componentProps = {
    email: user.user.email,
    amount:Number(amount) * 100,
    metadata: {
      name: user?.user.user_metadata.display_name,
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
  useEffect(()=>{
    if(Number(amount)<=0){
      toast.error('No carted products yet')
    }
  },[])

  if (!user?.user.user_metadata.display_name || !profile?.phone_number || !user?.user.email || !profile?.address || !amount) return null;

  return (
    <PaystackButton
      {...componentProps}
      className="bg-dark-orange ring-dark-orange hover:bg-dark-orange/80 visible mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-center text-sm font-medium text-white ring-offset-2 ring-offset-white transition-all duration-200 ease-linear group-hover:visible focus:ring-1 sm:py-2.5"
    />
  );
}


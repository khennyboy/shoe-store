'use client'
import { useRouter } from "next/navigation";
import { useUser } from "./handleUser";

export default function useHandleCheckout() {
  const router = useRouter();
  const { user } = useUser();
  const handleCheckout = () => {
    console.log('hello')
    // console.log('hello')
    // if (user) {
    //   router.push("/payment");
    // } else {
    //   router.push("/auth/login");
    // }
  };
  return { handleCheckout };
}

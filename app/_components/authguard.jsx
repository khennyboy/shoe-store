"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/app/hooks/handleUser";
import Loader from "../loading";

export default function AuthGuard({ children }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const isChecking = !isLoading && !user;
 
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login/?redirect=payment");
    }
  }, [isLoading, user, router]);

  if (isLoading || isChecking) return <Loader />;

  return <>{children}</>;
}

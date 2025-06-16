"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/app/hooks/handleUser";
import Loader from "../loading";

export default function AuthGuard({ children }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const isUserReady = !!user?.user.id; 
  const isChecking = isLoading || !isUserReady;

  useEffect(() => {
    if (!isChecking && !user) {
      router.push("/auth/login/?redirect=payment");
    }
  }, [isChecking, user, router]);

  if (isChecking) return <Loader />;

  return <>{children}</>;
}

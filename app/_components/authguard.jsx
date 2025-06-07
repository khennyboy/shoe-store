"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/app/hooks/handleUser";
import Loader from "../loading";

export default function AuthGuard({ children }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const shouldRedirect = !isLoading && !user;

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/auth/login/?redirect=payment");
    }
  }, [shouldRedirect, router]);

  if (isLoading || shouldRedirect) return <Loader />;

  return <>{children}</>;
}

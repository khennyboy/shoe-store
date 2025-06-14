"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const redirectTo = searchParams.get("redirect");
  const router = useRouter();

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    async function verifyPayment() {
      if (!reference) {
        setStatus("error");
        return;
      }

      try {
        const { user } = useUser();
        if (!user) {
          setStatus("error");
          return;
        }

        const productId = localStorage.getItem("cartedProducts");
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference,
            userId: user.user.id,
            productId,
          }),
        });

        if (res.ok) {
          setStatus("success");
          localStorage.clear("cartedProducts");
          // Optional: Redirect user to their order summary
          if (redirectTo) router.push(`/${redirectTo}`);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    verifyPayment();
  }, [reference]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 text-center">
      {status === "verifying" && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Verifying your payment...
          </h2>
          <p>Please wait while we confirm your order.</p>
        </div>
      )}

      {status === "success" && (
        <div>
          <h2 className="mb-2 text-xl font-semibold text-green-600">
            Payment Successful ✅
          </h2>
          <p>
            Your order has been confirmed. A receipt has been sent to your
            email.
          </p>
        </div>
      )}

      {status === "error" && (
        <div>
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Payment Verification Failed ❌
          </h2>
          <p>Something went wrong. Please contact support or try again.</p>
        </div>
      )}
    </div>
  );
}

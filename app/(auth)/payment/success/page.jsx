"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import useHandleCart from "@/app/hooks/handleCart";
import { formatCurrency } from "@/app/utils/helpers";
import { useUser } from "@/app/hooks/handleUser";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const { totalPrice } = useHandleCart();
  const { user } = useUser();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    async function verifyPayment() {
      if (!reference) {
        setStatus("error");
        return;
      }

      try {
        if (!user) {
          setStatus("error");
          return;
        }

        // Get and parse the carted products from localStorage
        const cartedProducts = JSON.parse(
          localStorage.getItem("cartedProducts") || "[]",
        );

        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference,
            userId: user.user.id,
            products: cartedProducts,
          }),
        });

        const json = await res.json();

        if (res.ok) {
          setStatus("success");

          const orderSummary = cartedProducts
            .map((p) => `• ${p.name} ×${p.quantity}`)
            .join("\n");

          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2,
            {
              to_email: user.email,
              full_name: user?.user.user_metadata.full_name,
              order_details: `🧾 Order Summary:\n${orderSummary}\n\nTotal: ${formatCurrency(
                totalPrice,
              )}`,
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          );

          localStorage.removeItem("cartedProducts");
        } else {
          console.error(json.error);
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    verifyPayment();
  }, [reference, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
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
          <p className="mb-4">
            Your order has been confirmed. A receipt has been sent to your
            email.
          </p>
          <Link
            href="/"
            className="bg-dark-orange hover:bg-dark-orange/90 inline-block rounded-md px-5 py-2 text-white shadow transition duration-200"
          >
            Go back to homepage
          </Link>
        </div>
      )}

      {status === "error" && (
        <div>
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Payment Verification Failed ❌
          </h2>
          <p className="mb-4">
            Something went wrong. Please contact support or try again.
          </p>
          <Link
            href="/"
            className="inline-block rounded-md bg-gray-800 px-5 py-2 text-white shadow transition duration-200 hover:bg-gray-700"
          >
            Go back to homepage
          </Link>
        </div>
      )}
    </div>
  );
}

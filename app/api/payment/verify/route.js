// /app/api/payment/verify/route.ts
import { NextResponse } from "next/server";
import supabase from "@/app/_lib/supabase";

export async function POST(req) {
  const body = await req.json();
  const { reference, userId, productId } = body;

  const verifyRes = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await verifyRes.json();
  const data = result.data;

  if (data.status === "success") {
    // 1. Save order to Supabase
    const { error: orderError } = await supabase.from("orders").insert([
      {
        user: userId,
        product: productId,
        address: "Provided from frontend or user_profiles",
        received: false,
      },
    ]);

    if (orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 });

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      { to_email: email, code: otp },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    );

    return NextResponse.json({ status: "order_created_and_email_sent" });
  } else {
    return NextResponse.json(
      { error: "Payment not verified" },
      { status: 400 },
    );
  }
}

import { NextResponse } from "next/server";
import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY || "";

export async function POST(req) {
  const rawBody = await req.text();
  const paystackSignature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  if (hash !== paystackSignature) {
    return new NextResponse("Invalid signature", { status: 403 });
  }

  const event = JSON.parse(rawBody);

  console.log("Paystack webhook event:", event);

  switch (event.event) {
    case "charge.success":
      console.log("✅ Payment succeeded:", event.data);
      break;

    case "invoice.payment_failed":
      console.log("❌ Payment failed:", event.data);
      break;

    case "charge.cancelled":
      console.log("⚠️ User canceled the payment or closed modal.");
      break;

    default:
      console.log("ℹ️ Unhandled event:", event.event);
  }
  return NextResponse.json({ message: "OK" }, { status: 200 });
}

export async function GET(req) {
  return NextResponse.json(
    { success: false, error: `Failed to send email` },
    { status: 500 },
  );
}



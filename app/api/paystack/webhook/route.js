import { createClient } from "@supabase/supabase-js";
import emailjs from '@emailjs/browser';
import { NextResponse } from "next/server";

// Initialize Supabase client (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Full access
);

// Webhook secret (from Paystack dashboard)
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req) {
  try {
    const body = await req.json();

    // Verify Paystack event
    const event = body?.event;
    const data = body?.data;

    if (event !== "charge.success") {
      return NextResponse.json({ status: "Ignored non-success event" });
    }

    // Extract values
    const email = data.customer.email;
    const amount = data.amount / 100; // Convert to Naira
    const reference = data.reference;

    // You can attach productId or metadata when you initiate the payment
    const metadata = data.metadata || {};
    const productId = metadata.productId;

    // Save to orders table
    const { error: orderError } = await supabase.from("orders").insert([
      {
        user: metadata.userId, // You should attach this in metadata
        product: productId,
        address: metadata.address,
        received: false,
      },
    ]);

    if (orderError) {
      console.error("Failed to save order:", orderError.message);
      return NextResponse.json({ status: "error saving order" }, { status: 500 });
    }

    // Send email using EmailJS
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        code: `Order Summary:\nProduct: ${metadata.productName}\nPrice: ₦${amount}\nDelivery: Within 3-5 days`,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    return NextResponse.json({ status: "Webhook processed successfully" });
  } catch (err) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

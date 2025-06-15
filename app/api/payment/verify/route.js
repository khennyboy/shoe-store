import { NextResponse } from "next/server";
import supabase from "@/app/_lib/supabase";

export async function POST(req) {
  const body = await req.json();
  const { reference, userId, products } = body;

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

  if (data?.status === "success") {
    const ordersToInsert = products.map((product) => ({
      user: userId,
      product: product.id,
      received: false,
    }));
    console.log(ordersToInsert);
    // Insert all orders in bulk
    const { error: orderError } = await supabase
      .from("orders")
      .insert(ordersToInsert);

    if (orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 });

    return NextResponse.json({
      status: 200,
    });
  } else {
    return NextResponse.json(
      { error: "Payment not verified" },
      { status: 400 },
    );
  }
}




// import { NextResponse } from "next/server";
// import { Resend } from "resend";
// import supabase from "@/app/_lib/supabase";

// // Initialize Resend
// const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

// // Paystack secret (for auth if you verify signatures)
// const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const event = body?.event;
//     const data = body?.data;

//     if (event !== "charge.success") {
//       return NextResponse.json({ status: "Ignored non-success event" });
//     }

//     // Get customer email and metadata from Paystack
//     const email = data.customer.email;
//     const amount = data.amount / 100;
//     const reference = data.reference;
//     const metadata = data.metadata || {};
//     const userId = metadata.userId;
//     const productId = metadata.productId;
//     const address = metadata.address || "No address";
//     const productName = metadata.productName || "Unnamed Product";

//     // Save to Supabase orders
//     const { error: orderError } = await supabase.from("orders").insert([
//       {
//         user: userId,
//         product: productId,
//         address,
//         received: false,
//       },
//     ]);

//     if (orderError) {
//       console.error("Error saving order:", orderError.message);
//       return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
//     }

//     // Send order confirmation email via Resend
//     await resend.emails.send({
//       from: "Store <onboarding@resend.dev>", // Replace with verified sender if needed
//       to: email,
//       subject: "🧾 Payment Confirmed – Order Received",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2 style="color: green;">✅ Payment Successful</h2>
//           <p>Hi there,</p>
//           <p>We’ve received your payment for the following:</p>
//           <ul>
//             <li><strong>Product:</strong> ${productName}</li>
//             <li><strong>Amount:</strong> ₦${amount}</li>
//             <li><strong>Delivery Address:</strong> ${address}</li>
//           </ul>
//           <p>Your order will be delivered within 3–5 working days.</p>
//           <p>Thank you for shopping with us!</p>
//           <br />
//           <p>— Store Team</p>
//         </div>
//       `,
//     });

//     return NextResponse.json({ status: "Webhook processed & email sent" });
//   } catch (err) {
//     console.error("Webhook processing failed:", err.message);
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
//   }
// }

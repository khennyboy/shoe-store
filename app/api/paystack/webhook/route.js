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




// app.post('/api/paystack/webhook', (req, res) => {
//     const event = req.body;
  
//     // 1. Verify the event came from Paystack
//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK_SECRET)
//       .update(JSON.stringify(req.body))
//       .digest("hex");
  
//     if (hash !== req.headers['x-paystack-signature']) {
//       return res.status(401).send('Unauthorized');
//     }
  
//     if (event.event === 'charge.success') {
//       const reference = event.data.reference;
//       const email = event.data.customer.email;
  
//       // 3. Update your database
//       const user = findUserByEmail(email);
//       user.paid = true;
//       saveUser(user);
  
//       sendEmail(email, "Payment successful", "You'll receive your goods in 3-5 days.");
//     }
  
//     res.sendStatus(200);
//   });
  
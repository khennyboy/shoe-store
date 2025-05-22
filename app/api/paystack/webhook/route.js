// app/api/paystack/webhook/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const config = {
  runtime: 'nodejs',   // ensure we can use crypto
};

const PAYSTACK_SECRET = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;

async function verifySignature(rawBody, signature) {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(rawBody)
    .digest('hex');

  if (hash !== signature) {
    return null;
  }
  return JSON.parse(rawBody);
}

export async function POST(request) {
  const signature = request.headers.get('x-paystack-signature');
  const rawBody = await request.text();

  const event = await verifySignature(rawBody, signature);
  if (!event) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  const { event: eventType, data } = event;

  switch (eventType) {
    case 'charge.success':
      console.log('✅ Payment succeeded:', data);
      // TODO: mark order as paid in your DB
      break;

    case 'charge.failed':
      console.log('❌ Payment failed:', data);
      // TODO: mark order as failed in your DB
      break;

    // Paystack doesn’t have a single “cancelled” event, 
    // but you can catch related ones:
    case 'authorization.cancelled':
    case 'customeridentification.failed':
      console.log('🚫 Payment cancelled/authorization failed:', data);
      // TODO: mark order as cancelled in your DB
      break;

    default:
      console.log('ℹ️ Unhandled event:', eventType);
  }

  // Always return 200 to acknowledge receipt
  return NextResponse.json({ received: true });
}

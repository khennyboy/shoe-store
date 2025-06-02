// app/api/send-otp/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import supabase from "@/app/_lib/supabase";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await supabase.from("email_otps").insert([{ email, otp, expires_at: expiresAt }]);

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP from SoleMate",
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
1
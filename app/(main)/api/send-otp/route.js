// app/api/send-email/route.ts
import { Resend } from "resend";
import { NextResponse } from 'next/server'
import supabase from "@/app/_lib/supabase";
const resend = new Resend(
  "re_gebdo1fk_HgSMzjpz7K1DhN9xzJbhhu8h",
);
export async function POST(request) {
  console.log(request);
  try {
    const { email } = await request.json();
    // genarate the OTP and send to the user email and then save it to the database
    const otp = Math.floor(1000 + Math.random() * 9000); 
    // this expires in the next 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
    await supabase.from('email_otps').insert([
        { email, otp, expires_at: expiresAt }
      ]);
    const {data, error} = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: email,
      subject: "Your OTP from SoleMate",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Your Verification Code</h1>
          <p>Here's your OTP to verify your email:</p>
          <div style="font-size: 24px; font-weight: bold; color: #2563eb;">
            ${otp}
          </div>
          <p style="margin-top: 20px;">This code will expire in 5 minutes.</p>
        </div>
      `,
    });
    if(error) throw new Error(error.message)
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: `Failed to send email--${err}` },
      { status: 500 },
    );
  }
}

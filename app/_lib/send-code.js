import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import supabase from "@/app/_lib/supabase";

export async function sendOtpEmail(email) {
  console.log(email)
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expires_at = new Date(Date.now() + 5 * 60 * 1000);

  try {
    const [dbResponse, emailResponse] = await Promise.all([
      supabase.from("email_otps").insert([{ email, otp, expires_at }]),
      emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { to_email: email, code: otp },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      ),
    ]);

    if (dbResponse.error) {
      throw new Error(`Error: ${dbResponse.error.message}`);
    }
    if (
      !emailResponse ||
      (emailResponse.status && emailResponse.status !== 200)
    ) {
      throw new Error("Failed to send OTP email.");
    }
  } catch (error) {
    console.error("sendOtpEmail error:", error);
    throw error;
  }
}

export const handleSendCode = async (
  email,
  setCodeSent,
  setCountdown,
  setIsLoading,
) => {
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Please enter a valid email");
    throw new Error("");
  }
  try {
    setIsLoading(true);
    await sendOtpEmail(email);
    setIsLoading(false);
    setCodeSent(true);
    setCountdown(60 * 5);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev == 0) {
          clearInterval(timer);
          setCodeSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast.success("OTP sent successfully");
  } catch (err) {
    toast.error(err.message || "Failed to send OTP");
    setIsLoading(false);
    setCodeSent(false);
  }
};

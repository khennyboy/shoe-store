import { toast } from "react-toastify";

export async function sendOtpEmail(email) {
  try {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Error generating OTP");
    return data;
  } catch (err) {
    throw err;
  }
}


export const handleSendCode = (email, sendCode) => {
    if (!/\S+@\S+\.\S+/.test(email) ) {
      toast.error("Please enter a valid email");
      return;
    }
    sendCode(email); 
  };
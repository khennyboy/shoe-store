import { toast } from "react-toastify";

export async function sendOtpEmail(email) {
  try {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok || data.success === false) {
      throw new Error(data.error || "Error generating OTP");
    }

    return data;
  } catch (err) {
    throw err;
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

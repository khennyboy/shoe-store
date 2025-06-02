"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = email, 2 = otp + password
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Enter a valid email");

    setLoading(true);
    try {
      const res = await fetch("/api/send-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !newPassword) {
      return toast.error("Please enter the OTP and new password");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify-reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");

      toast.success("Password updated successfully. You can now log in.");
      // optionally: redirect to login
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">Password Recovery</h2>

      {step === 1 && (
        <>
          <label className="mb-2 block font-semibold">Email address</label>
          <input
            type="email"
            className="mb-4 w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSendOtp}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="mb-2 block font-semibold">OTP</label>
          <input
            type="text"
            className="mb-4 w-full rounded border px-3 py-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <label className="mb-2 block font-semibold">New Password</label>
          <input
            type="password"
            className="mb-4 w-full rounded border px-3 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  );
}

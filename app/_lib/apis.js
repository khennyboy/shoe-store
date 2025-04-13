

import supabase from "./supabase";

export async function getProducts() {
  let { data, error } = await supabase.from("products").select("*");
  console.log(data)
  if (error) {
    throw new Error(`${error.message}`);
  }
  return data;
}

export async function signupUser({otp, email, password}) {
  console.log(email, password)
  try {
    await verifyOTP(otp, email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(error, data)
    if (error) throw new Error(error.message);
  
    return data;
  } catch (error) {
    console.log(error.message, "signuperror");
    throw new Error(error.message);
  }
}

async function verifyOTP(otp, email) {
  const { data, error } = await supabase
    .from("email_otps")
    .select("*")
    .eq("email", email)
    .eq("otp", otp)
    .single()

  if (error || !data) {
    throw new Error("Invalid OTP");
  }
 
  let currentTime = new Date();
  let expiryTime = new Date(data.expires_at);
 
  if (currentTime > expiryTime) {
    throw new Error("OTP has expired");
  }

  return true;
}

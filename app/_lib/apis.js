import supabase from "./supabase";

export async function getProducts() {
  let { data, error } = await supabase.from("products").select("*");
  console.log(data);
  if (error) {
    throw new Error(`${error.message}`);
  }
  return data;
}

export async function signupUser({ otp, email, password }) {
  console.log(email, password);
  try {
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    await verifyOTP(otp, email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    await supabase.from("email_otps").delete().eq("email", email);

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
    .single();

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

export async function loginUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw new Error(error.message);
    console.log(data, "google");
    return data;
  } catch (error) {
    console.error("Google Sign-in Error:", error.message);
    throw new Error(error.message);
  }
}

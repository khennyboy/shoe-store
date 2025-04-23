import supabase from "./supabase";

export async function getProducts() {
  try {
    let { data, error } = await supabase.from("products").select("*");
    if (error) {
      throw new Error(`${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signupUser({ otp, email, password }) {
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
    throw new Error(error.message);
  }
}

async function verifyOTP(otp, email) {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/?loggedIn=true`,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}


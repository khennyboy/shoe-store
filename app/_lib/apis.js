import { debounce } from "lodash";
import { PAGE_SIZE } from "../utils/constant";
import supabase from "./supabase";

export async function getProducts({ filter, page }) {
  try {
    let query = supabase.from("products").select("*", {
      count: "exact",
    });

    if (filter !== "all") {
      query = query.eq("category", filter);
    }

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }
    let { data, error, count } = await query;
    if (error) {
      throw new Error("Products could not be loaded");
    }
    return { data, count };
  } catch (error) {
    throw error;
  }
}

export async function signupUser({ otp, email, password }) {
  try {
    await verifyOTP(otp, email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    await supabase.from("email_otps").delete().eq("email", email);
    return data;
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
    return true;
  } catch (error) {
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectParam = searchParams.get("redirect");

    const redirectToUrl = redirectParam
      ? `${window.location.origin}/?loggedIn=true&redirect=${redirectParam}`
      : `${window.location.origin}/?loggedIn=true`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectToUrl,
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw error;
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
    throw error;
  }
}

export async function updateUser({ email }) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://shoe-store-ashy-two.vercel.app/auth/update-password",
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserProfile(id) {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user", id)
      .single();

    if (profileError) throw new Error(profileError.message);

    return profile;
  } catch (error) {
    console.error("Failed to get user profile:", error.message);
    throw error;
  }
}

export const saveUserData = debounce(
  async ({ type, phone_number = null, address = null, id }) => {
    try {
      let updateData = {};

      if (type === "phone_number") {
        updateData.phone_number = phone_number;
      } else if (type === "address") {
        updateData.address = address;
      }

      const { data, error } = await supabase
        .from("user_profiles")
        .update(updateData)
        .eq("user", id)
        .select();

      if (error) throw new Error(error.message);

          } catch (error) {
      console.error("Error updating data:", error.message);
    }
  },
  1000,
);

export const updateUserName = debounce(async (updated_name) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      display_name: updated_name,
    },
  });

  if (error) {
    console.error("Error updating display name:", error);
    throw new Error(error.message);
  } else {
      }
}, 1000);

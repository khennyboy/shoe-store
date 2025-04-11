import supabase from "./supabase";

export async function getProducts() {
  let { data, error } = await supabase.from("products").select("*");
  if (error) {
    throw new Error(`${error.message}`);
  }
  return data;
}

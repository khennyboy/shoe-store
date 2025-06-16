import supabase from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { reference, userId, products } = body;
        
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await verifyRes.json();
    
    const data = result.data;
    
    if (data?.status === "success") {
      const ordersToInsert = products.map((product) => ({
        user: userId,
        product: product.id,
      }));
      
      const { error: orderError } = await supabase
        .from("orders")
        .insert(ordersToInsert);

      if (orderError) {
        console.error("SUPABASE ERROR", orderError);
        return NextResponse.json({ error: orderError.message }, { status: 500 });
      }

      return NextResponse.json({ success: "order_saved"},{ status: 200 });
    } else {
      return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
    }
  } catch (err) {
    console.error("API ERROR", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




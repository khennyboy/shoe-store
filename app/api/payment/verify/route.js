import supabase from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { reference, userId, products } = body;

    // ✅ Check for existing order with same reference
    const { data: existingOrders, error: checkError } = await supabase
      .from("orders")
      .select("id")
      .eq("reference", reference);

    if (checkError) {
      console.error("Check Error:", checkError);
      return NextResponse.json(
        { error: "Order check failed" },
        { status: 500 }
      );
    }

    if (existingOrders.length > 0) {
      return NextResponse.json(
        {
          message: "Payment already processed",
          alreadyProcessed: true,
        },
        { status: 200 }
      );
    }
    
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
        reference,
      }));

      const { error: insertError } = await supabase
        .from("orders")
        .insert(ordersToInsert);

      if (insertError) {
        console.error("Insert Error:", insertError);
        return NextResponse.json(
          { error: "Order insertion failed" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message: "Order placed successfully",
          alreadyProcessed: false,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

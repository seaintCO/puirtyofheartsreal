import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { shopProducts } from "@/data/shop-products";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      productSlug?: string;
    };
    const email = body.email?.trim().toLowerCase();
    const productSlug = body.productSlug?.trim();

    if (
      !email ||
      !emailPattern.test(email) ||
      !productSlug ||
      !shopProducts.some((product) => product.slug === productSlug)
    ) {
      return NextResponse.json(
        { error: "Enter a valid email and product." },
        { status: 400 },
      );
    }

    const admin = createAdminClient();
    const { error } = await admin
      .from("product_waitlist")
      .upsert(
        { email, product_slug: productSlug },
        { onConflict: "email,product_slug", ignoreDuplicates: true },
      );
    if (error) throw error;

    return NextResponse.json({ joined: true });
  } catch (error) {
    console.error("Product waitlist error:", error);
    return NextResponse.json(
      { error: "We could not save your email. Please try again." },
      { status: 500 },
    );
  }
}


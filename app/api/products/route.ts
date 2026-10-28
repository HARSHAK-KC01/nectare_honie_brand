import { NextResponse } from "next/server";

import { visibleProducts } from "@/data/products";
import { mapSupabaseProduct, supabaseAdmin, supabasePublic } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = supabaseAdmin ?? supabasePublic;

  if (!supabase) {
    return NextResponse.json({ products: visibleProducts, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, product_variants(*)")
    .eq("visible", true);

  if (error || !data || data.length === 0) {
    return NextResponse.json({
      products: visibleProducts,
      source: "fallback",
      error: error?.message ?? (data?.length === 0 ? "No products found in database" : "Database unavailable"),
    });
  }

  return NextResponse.json({
    products: data.map(mapSupabaseProduct),
    source: "supabase",
  });
}

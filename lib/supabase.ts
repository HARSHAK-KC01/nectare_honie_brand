import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types/product";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY;

export const supabaseBrowser = () => {
  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
};

export const supabasePublic =
  supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export const supabaseAdmin =
  supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export interface SupabaseVariantRow {
  id: string | number;
  label?: string | null;
  weight?: string | null;
  price?: number | null;
  stock?: number | null;
}

export interface SupabaseProductRow {
  id: string | number;
  slug?: string | null;
  name?: string | null;
  description?: string | null;
  benefits?: string[] | null;
  nutrition?: {
    energy?: string | null;
    carbs?: string | null;
    sugars?: string | null;
    protein?: string | null;
  } | null;
  image?: string | null;
  visible?: boolean | null;
  product_variants?: SupabaseVariantRow[] | null;
}

export function mapSupabaseProduct(product: SupabaseProductRow): Product {
  const variants = Array.isArray(product.product_variants)
    ? product.product_variants.map((variant: SupabaseVariantRow) => ({
        id: String(variant.id),
        label: String(variant.label ?? ""),
        weight: String(variant.weight ?? ""),
        price: Number(variant.price ?? 0),
        stock: Number(variant.stock ?? 0),
      }))
    : [];

  return {
    id: String(product.id),
    slug: String(product.slug ?? product.id),
    name: String(product.name ?? "Unnamed Product"),
    description: String(product.description ?? ""),
    benefits: Array.isArray(product.benefits) ? product.benefits : [],
    nutrition: {
      energy: String(product.nutrition?.energy ?? ""),
      carbs: String(product.nutrition?.carbs ?? ""),
      sugars: String(product.nutrition?.sugars ?? ""),
      protein: String(product.nutrition?.protein ?? ""),
    },
    image: String(product.image ?? "/jar-placeholder.svg"),
    visible: Boolean(product.visible ?? true),
    variants,
  };
}

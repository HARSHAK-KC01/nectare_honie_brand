"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { visibleProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";

export function ProductGrid() {
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState<Product[]>(visibleProducts);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [recentlyAdded, setRecentlyAdded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          return;
        }

        const payload = await response.json();

        if (isMounted && Array.isArray(payload.products) && payload.products.length > 0) {
          setProducts(payload.products);
        }
      } catch {
        // Keep fallback mock data if API is unreachable
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const variantLookup = useMemo(() => {
    const map: Record<string, { id: string; label: string; price: number; stock: number }> = {};
    products.forEach((product) => {
      if (Array.isArray(product.variants)) {
        product.variants.forEach((variant) => {
          map[variant.id] = variant;
        });
      }
    });
    return map;
  }, [products]);

  const handleAddToCart = (productId: string, productName: string, selectedVariant: { id: string; label: string; price: number }) => {
    addItem({
      variantId: selectedVariant.id,
      productName,
      variantLabel: selectedVariant.label,
      unitPrice: variantLookup[selectedVariant.id]?.price ?? selectedVariant.price,
    });

    setRecentlyAdded((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setRecentlyAdded((prev) => ({ ...prev, [productId]: false }));
    }, 1400);
  };

  return (
    <section className="w-full">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-[#8a8a8a]">SHOP RAW HONEY</p>
          <h2 className="mt-2 text-3xl font-bold text-[#111111] md:text-4xl">Pure Product. Dynamic Variants.</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {products.map((product) => {
          const variants = Array.isArray(product.variants) ? product.variants : [];
          const selected =
            variants.find((variant) => variant.id === selectedVariants[product.id]) || variants[0];
          const inventoryText = selected
            ? selected.stock > 0
              ? `${selected.stock} units left`
              : "Out of stock"
            : "Unavailable";
          const isAdded = recentlyAdded[product.id];
          const displayDescription =
            product.description && product.description.trim().length > 0
              ? product.description
              : "Pure, unpasteurized cold-extracted raw honey retaining natural enzymes and floral antioxidants.";

          return (
            <article
              key={product.id}
              className="glass-card group flex flex-col justify-between overflow-hidden p-6 md:p-8"
            >
              <div className="space-y-5">
                {/* Product Jar Illustration / Image with Zoom Interaction */}
                <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#f2f2f2] to-[#ebebeb] p-4">
                  <Image
                    src={product.image || "/jar-placeholder.svg"}
                    alt={product.name}
                    width={180}
                    height={210}
                    className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-wider text-[#111111] shadow-sm backdrop-blur">
                    RAW 100%
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111111]">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#444444]">{displayDescription}</p>
                </div>

                {variants.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold tracking-wider text-[#8a8a8a]">
                      SELECT SIZE
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {variants.map((variant) => {
                        const isSelected = selected?.id === variant.id;
                        return (
                          <button
                            key={variant.id}
                            type="button"
                            onClick={() =>
                              setSelectedVariants((current) => ({
                                ...current,
                                [product.id]: variant.id,
                              }))
                            }
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                              isSelected
                                ? "border-[#111111] bg-[#111111] text-white shadow-sm"
                                : "border-[#e5e5e5] bg-white text-[#111111] hover:border-[#111111]/40 hover:bg-[#fafafa]"
                            }`}
                          >
                            {variant.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {Array.isArray(product.benefits) && product.benefits.length > 0 && (
                  <div className="border-t border-[#e5e5e5]/80 pt-4">
                    <ul className="space-y-1.5 text-xs text-[#555555]">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#d8a538]" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#e5e5e5] pt-5">
                <div>
                  <p className="text-2xl font-bold text-[#111111]">
                    {selected ? `Rs ${selected.price.toLocaleString("en-IN")}` : "N/A"}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8a8a8a]">{inventoryText}</p>
                </div>
                <button
                  type="button"
                  className={`premium-btn px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    isAdded ? "!bg-[#1b7a42] !text-white" : ""
                  }`}
                  onClick={() => {
                    if (!selected) return;
                    handleAddToCart(product.id, product.name, selected);
                  }}
                  disabled={!selected || selected.stock === 0}
                >
                  {isAdded ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

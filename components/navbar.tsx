"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCartStore } from "@/store/cart-store";
import { useIsMounted } from "@/lib/use-mounted";

type NavbarProps = {
  dark?: boolean;
  floating?: boolean;
};

export function Navbar({ dark = false, floating = false }: NavbarProps) {
  const isMounted = useIsMounted();
  const items = useCartStore((state) => state.items);
  const itemCount = useMemo(
    () => (isMounted ? items.reduce((sum, item) => sum + item.qty, 0) : 0),
    [isMounted, items]
  );

  const headerClass = dark
    ? "border-white/10 bg-[#0a0a0a]/70 text-white"
    : "border-[#e5e5e5]/80 bg-white/90 text-[#111111]";

  const linkClass = dark ? "text-white/85 hover:text-white" : "text-[#444444] hover:text-[#111111]";

  return (
    <header
      className={`top-0 z-40 border-b backdrop-blur ${headerClass} ${floating ? "sticky" : "relative"}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="text-xl font-semibold tracking-[0.2em]">
          NECTARE HONIE
        </Link>
        <div className={`flex items-center gap-4 text-sm font-medium ${linkClass}`}>
          <Link href="/">Story</Link>
          <Link href="/shop">Shop</Link>
          <span
            className={`rounded-full border px-3 py-1 ${
              dark ? "border-white/30 text-white" : "border-[#e5e5e5] text-[#111111]"
            }`}
          >
            Cart {itemCount}
          </span>
        </div>
      </nav>
    </header>
  );
}

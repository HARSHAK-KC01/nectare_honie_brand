"use client";

import { useMemo } from "react";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import { useIsMounted } from "@/lib/use-mounted";

const formatINR = (value: number) => `Rs ${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export function CartPanel() {
  const isMounted = useIsMounted();
  const items = useCartStore((state) => state.items);
  const paymentMode = useCartStore((state) => state.paymentMode);
  const setPaymentMode = useCartStore((state) => state.setPaymentMode);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);

  const currentItems = useMemo(() => (isMounted ? items : []), [isMounted, items]);
  const totals = useMemo(() => getCartTotals(currentItems, paymentMode), [currentItems, paymentMode]);

  return (
    <aside className="glass-card h-fit p-6 md:sticky md:top-24">
      <h3 className="text-2xl font-bold text-[#111111]">Your Cart</h3>
      <div className="mt-4 space-y-3">
        {currentItems.length === 0 ? (
          <p className="text-sm text-[#8a8a8a]">No items yet. Add a variant to continue.</p>
        ) : (
          currentItems.map((item) => (
            <div key={item.variantId} className="rounded-lg border border-[#e5e5e5] bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-[#111111]">{item.productName}</p>
                  <p className="text-xs text-[#8a8a8a]">{item.variantLabel}</p>
                </div>
                <button type="button" onClick={() => removeItem(item.variantId)} className="text-xs text-[#8a8a8a]">
                  Remove
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center rounded-md border border-[#e5e5e5]">
                  <button
                    type="button"
                    className="px-2 py-1 text-sm"
                    onClick={() => updateQty(item.variantId, item.qty - 1)}
                  >
                    -
                  </button>
                  <span className="px-3 text-sm">{item.qty}</span>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm"
                    onClick={() => updateQty(item.variantId, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-medium text-[#111111]">{formatINR(item.unitPrice * item.qty)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg border border-[#e5e5e5] bg-[#f7f7f7] p-2">
        <button
          type="button"
          onClick={() => setPaymentMode("prepaid")}
          className={`rounded-md px-3 py-2 text-sm ${
            paymentMode === "prepaid" ? "bg-[#111111] text-white" : "bg-white text-[#111111]"
          }`}
        >
          Prepaid
        </button>
        <button
          type="button"
          onClick={() => setPaymentMode("cod")}
          className={`rounded-md px-3 py-2 text-sm ${
            paymentMode === "cod" ? "bg-[#111111] text-white" : "bg-white text-[#111111]"
          }`}
        >
          COD
        </button>
      </div>

      <dl className="mt-5 space-y-2 text-sm text-[#444444]">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatINR(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax (5%)</dt>
          <dd>{formatINR(totals.tax)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd>{formatINR(totals.shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>COD Handling</dt>
          <dd>{formatINR(totals.codFee)}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-lg border border-[#111111] bg-[#111111] p-4 text-white">
        <p className="text-xs uppercase tracking-[0.18em]">Payable Now</p>
        <p className="mt-1 text-2xl font-semibold">{formatINR(totals.payableNow)}</p>
        {paymentMode === "cod" && (
          <p className="mt-2 text-xs text-white/80">Due on delivery: {formatINR(totals.dueOnDelivery)}</p>
        )}
      </div>

      <button type="button" className="premium-btn mt-4 w-full px-5 py-3 text-sm" disabled={!currentItems.length}>
        Continue to Checkout
      </button>
      <button
        type="button"
        className="mt-2 w-full rounded-md border border-[#e5e5e5] px-5 py-3 text-sm text-[#444444]"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </aside>
  );
}

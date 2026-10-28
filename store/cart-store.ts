"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PaymentMode = "prepaid" | "cod";

export type CartItem = {
  variantId: string;
  productName: string;
  variantLabel: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  paymentMode: PaymentMode;
  setPaymentMode: (mode: PaymentMode) => void;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      paymentMode: "prepaid",
      setPaymentMode: (mode) => set({ paymentMode: mode }),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.variantId === item.variantId
                  ? { ...entry, qty: Math.min(entry.qty + 1, 10) }
                  : entry,
              ),
            };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        })),
      updateQty: (variantId, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, qty: Math.max(1, Math.min(10, qty)) } : item,
          ),
        })),
      clearCart: () => set({ items: [], paymentMode: "prepaid" }),
    }),
    {
      name: "nectare-cart",
    },
  ),
);

export const getCartTotals = (items: CartItem[], paymentMode: PaymentMode) => {
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const tax = subtotal * 0.05;
  const shipping = 0;
  const codFee = paymentMode === "cod" ? 50 : 0;
  const grossTotal = subtotal + tax + shipping + codFee;
  const payableNow = paymentMode === "cod" ? (items.length ? 100 : 0) : grossTotal;
  const dueOnDelivery = paymentMode === "cod" ? Math.max(grossTotal - payableNow, 0) : 0;

  return {
    subtotal,
    tax,
    shipping,
    codFee,
    grossTotal,
    payableNow,
    dueOnDelivery,
  };
};

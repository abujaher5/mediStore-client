"use client";

import * as React from "react";
import { useCartStore, type CartItem } from "@/store/cartStore";

const CartContext = React.createContext<CartItem[] | null>(null);

function CartProvider({
  initialCart,
  children,
}: {
  initialCart: CartItem[];
  children: React.ReactNode;
}) {
  return (
    <CartContext.Provider value={initialCart}>{children}</CartContext.Provider>
  );
}

function useCart() {
  const initialCart = React.useContext(CartContext);
  const cart = useCartStore((state) => state.cart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  if (hasHydrated) return cart;

  return initialCart ?? cart;
}

export { CartProvider, useCart };

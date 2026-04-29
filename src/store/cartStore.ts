"use client";

import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (medicine: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (medicine) =>
    set((state) => {
      const exist = state.cart.find((item) => item.id === medicine.id);

      if (exist) {
        return {
          cart: state.cart.map((item) =>
            item.id === medicine.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        cart: [...state.cart, { ...medicine, quantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));

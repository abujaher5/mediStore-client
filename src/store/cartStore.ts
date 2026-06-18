// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartStore {
//   cart: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity">) => void;
//   removeFromCart: (id: string) => void;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set) => ({
//       cart: [],

//       addToCart: (item) =>
//         set((state) => {
//           const existing = state.cart.find((p) => p.id === item.id);

//           if (existing) {
//             return {
//               cart: state.cart.map((p) =>
//                 p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
//               ),
//             };
//           }

//           return {
//             cart: [...state.cart, { ...item, quantity: 1 }],
//           };
//         }),

//       removeFromCart: (id) =>
//         set((state) => ({
//           cart: state.cart.filter((item) => item.id !== id),
//         })),
//     }),
//     {
//       name: "cart-storage",
//     },
//   ),
// );

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === item.id);
          toast.success("Added to cart");
          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        toast.success("Removed from cart") &&
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);

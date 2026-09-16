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
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const cookieStorage: StateStorage = {
  getItem: (name) => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  },
  setItem: (name, value) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )}; path=/; max-age=31536000; samesite=lax`;
  },
  removeItem: (name) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

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

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
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
      storage: createJSONStorage(() => cookieStorage),
      skipHydration: true,
      partialize: (state) => ({ cart: state.cart }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

if (typeof window !== "undefined") {
  void useCartStore.persist.rehydrate();
}

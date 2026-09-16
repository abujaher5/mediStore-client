import type { CartItem } from "@/store/cartStore";

const CART_COOKIE_NAME = "cart-storage";

const parseCartCookie = (raw?: string): CartItem[] => {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    const cart = parsed?.state?.cart;

    return Array.isArray(cart) ? (cart as CartItem[]) : [];
  } catch {
    return [];
  }
};

export { CART_COOKIE_NAME, parseCartCookie };

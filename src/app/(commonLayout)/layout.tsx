import { cookies } from "next/headers";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { CART_COOKIE_NAME, parseCartCookie } from "@/lib/cart-cookie";
import { CartProvider } from "@/providers/CartProvider";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const cartCookie = (await cookies()).get(CART_COOKIE_NAME)?.value;
  const initialCart = parseCartCookie(cartCookie);

  return (
    <CartProvider initialCart={initialCart}>
      <div className="max-w-7xl mx-auto  px-2">
        <Navbar />
        <div className="min-h-[calc(100vh-572.51px)]  ">{children}</div>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default CommonLayout;

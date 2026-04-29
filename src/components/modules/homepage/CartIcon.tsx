import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartIcon = () => {
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-6 h-6 group-hover:text-yellow-600" />

      <span className="absolute -top-1 -right-1 bg-black text-yellow-500 h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

export default CartIcon;

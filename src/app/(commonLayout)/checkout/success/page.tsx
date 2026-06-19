import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-4">
      <CheckCircle2 size={64} className="text-green-500" strokeWidth={1.5} />
      <h1 className="text-3xl font-bold text-gray-800">Order Placed!</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Thank you for your order. We&apos;ll deliver your medicines as soon as
        possible.
      </p>
      {searchParams.orderId && (
        <p className="text-xs text-gray-400 bg-gray-100 px-4 py-2 rounded-lg">
          Order ID:
          <span className="font-mono font-semibold">
            {searchParams.orderId}
          </span>
        </p>
      )}
      <Link
        href="/shop"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition"
      >
        Continue Purchase Medicines
      </Link>
    </div>
  );
}

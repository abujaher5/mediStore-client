// app/payment-success/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PaymentSuccess from "./PaymentSuccess";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <Loader2 size={40} className="animate-spin text-green-500" />
          <p className="text-gray-600 font-medium">Verifying your payment...</p>
        </div>
      }
    >
      <PaymentSuccess />
    </Suspense>
  );
}

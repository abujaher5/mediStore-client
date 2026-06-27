// app/payment-success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

export default function PaymentSuccessPage() {
  const API_URL = env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("success");
          // Optionally fetch the orderId from the session if you need it
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-green-500" />
        <p className="text-gray-600 font-medium">Verifying your payment...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <XCircle size={52} className="text-red-400" strokeWidth={1.2} />
        <p className="text-lg font-semibold text-gray-700">
          Payment verification failed
        </p>
        <p className="text-sm text-gray-400">
          Your order may not have been placed.
        </p>
        <Link
          href="/"
          className="text-sm bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <CheckCircle2 size={52} className="text-green-500" strokeWidth={1.2} />
      <h1 className="text-xl font-bold text-gray-800">Payment Successful!</h1>
      <p className="text-sm text-gray-400">Your order has been confirmed.</p>
      <Link
        href="/customer-dashboard/my-orders"
        className="text-sm bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition"
      >
        View My Orders
      </Link>
    </div>
  );
}

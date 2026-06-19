/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCartStore } from "@/store/cartStore";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, PackageCheck } from "lucide-react";
import { useCurrentUser } from "@/hooks/get-logged-user";

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  paymentMethod: "COD" | "ONLINE";
};

export default function CheckoutPage() {
  const { user } = useCurrentUser();

  if (!user) {
    redirect("login");
  }

  if (user.role !== "CUSTOMER") {
    redirect("/");
  }

  const { cart, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "COD",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = subtotal >= 500 ? 0 : 60;
  const totalAmount = subtotal + deliveryFee;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          address: form.address,
          city: form.city,
          notes: form.notes || undefined,
        },

        items: cart.map((item) => ({
          medicineId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentMethod: form.paymentMethod,
        subtotal,
        deliveryFee,
        totalAmount,
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderPayload),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Order failed");
      }

      const data = await res.json();

      clearCart();
      toast.success("Order placed successfully!");

      router.push(`/checkout/success?orderId=${data.data.orderId}`);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <PackageCheck size={52} strokeWidth={1.2} className="text-gray-300" />
        <p className="text-lg font-semibold text-gray-600">
          Your cart is empty
        </p>
        <Link
          href="/"
          className="text-sm bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition"
        >
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 pb-20">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={15} /> Back to Cart
        </Link>
        <h1 className="text-lg font-bold text-gray-800">Checkout</h1>
        <span className="text-xs text-gray-400">
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* ── LEFT: Form ── */}
        <div className="space-y-5">
          {/* Delivery info */}
          <div className="bg-white text-black border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House, Road, Area"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white"
                >
                  <option value="">Select city</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                  <option>Barishal</option>
                  <option>Mymensingh</option>
                  <option>Rangpur</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions for your order..."
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition ${
                  form.paymentMethod === "COD"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD" // ✅ uppercase
                  checked={form.paymentMethod === "COD"}
                  onChange={handleChange}
                  className="accent-green-600"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-gray-400">Pay when you receive</p>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition ${
                  form.paymentMethod === "ONLINE"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE" // ✅ uppercase
                  checked={form.paymentMethod === "ONLINE"}
                  onChange={handleChange}
                  className="accent-green-600"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Online Payment
                  </p>
                  <p className="text-xs text-gray-400">bKash / Nagad / Card</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Order summary ── */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-24">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">Order Summary</h2>
          </div>

          <div className="px-5 py-4 space-y-3 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-11 h-11 relative rounded-lg overflow-hidden border border-gray-100 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800 shrink-0">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-gray-100 space-y-2.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal ({totalItems} items)</span>
              <span>৳ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Truck size={13} /> Delivery
              </span>
              {deliveryFee === 0 ? (
                <span className="text-green-600 font-medium">Free 🎉</span>
              ) : (
                <span>৳ {deliveryFee.toFixed(2)}</span>
              )}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ৳ {totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-all mt-2"
            >
              {loading ? "Placing Order..." : "Place Order →"}
            </button>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={13} className="text-green-500" />
                100% genuine medicines
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Truck size={13} className="text-green-500" />
                Fast delivery across Bangladesh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

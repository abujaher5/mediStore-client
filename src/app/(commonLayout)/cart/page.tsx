"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          🛒 Your cart is empty
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5 ">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 border rounded-xl p-4 shadow-sm hover:shadow-md transition h-fit"
              >
                {/* Image */}
                <div className="w-24 h-24 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>

                  <p className="text-gray-500">Price: ৳ {item.price}</p>

                  <p className="text-sm mt-1">
                    Quantity:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-lg">
                    ৳ {item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border rounded-xl p-5 shadow-md h-fit sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-600">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Grand Total</span>
              <span>৳ {total}</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

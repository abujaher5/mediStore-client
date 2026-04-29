"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">My Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} className="border p-4 mb-4 rounded">
          <h2>{item.name}</h2>

          <p>Price: ৳ {item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <button
            onClick={() => removeFromCart(item.id)}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-5">Total: ৳ {total}</h2>
    </div>
  );
}

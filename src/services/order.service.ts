import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_URL;

export const orderService = {
  getMyOrders: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/orders/my-orders", {
        credentials: "include",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const res = await fetch(`${API_URL}/seller/orders/${orderId}`, {
      method: "PATCH",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ status }),
    });

    return res.json();
  },
};

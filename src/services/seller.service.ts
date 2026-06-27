import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const sellerService = {
  myMedicines: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/seller/my-medicines`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  getDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/seller/medicines/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  },

  getMyOrders: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/orders/my-orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  getOrderedMedicines: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/seller/orders`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.json();
  },
};

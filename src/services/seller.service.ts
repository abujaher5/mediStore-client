import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_URL;
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

  // updateStock: async (id: string, stock: number) => {
  //   const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
  //     method: "PATCH",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ stock }),
  //   });

  //   return res.json();
  // },

  getDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/seller/medicines/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  },
};

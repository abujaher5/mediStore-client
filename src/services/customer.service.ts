import { env } from "@/env";
import { cookies } from "next/headers";
const API_URL = env.NEXT_PUBLIC_API_URL;

export const customerService = {
  getDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/customer/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  },
};

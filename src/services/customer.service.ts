import { env } from "@/env";
import { cookies } from "next/headers";
const API_URL = env.NEXT_PUBLIC_API_URL;

export const customerService = {
  getDashboardStats: async () => {
    const cookieStore = await cookies();
    console.log("NEXT COOKIES:", cookieStore.toString());

    const res = await fetch(`${API_URL}/api/customer/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    console.log("STATUS:", res.status);

    const data = await res.json();

    console.log("RESPONSE:", data);

    return data;
  },
};

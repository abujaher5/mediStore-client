import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;
export const adminService = {
  getDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/users/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  },
};

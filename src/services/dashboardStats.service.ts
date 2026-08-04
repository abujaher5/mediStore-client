import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const dashboardStats = {
  getAdminDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/admin/users/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();

    return data;
  },

  getCustomerDashboardStats: async () => {
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
  getSellerDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/seller/medicines/dashboard-stats`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  },
};

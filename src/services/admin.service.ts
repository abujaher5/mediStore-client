import { cookies } from "next/headers";

export const adminService = {
  getDashboardStats: async () => {
    const cookieStore = await cookies();

    const res = await fetch(
      "http://localhost:5000/api/admin/users/dashboard-stats",
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

  

    return await res.json();
  },
};

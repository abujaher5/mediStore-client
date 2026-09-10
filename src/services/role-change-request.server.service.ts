import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const roleChangeRequestServerService = {
  getAllRequests: async function (status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${API_URL}/api/role-change-requests?status=${status}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );

      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },
};

import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      if (session?.data === null) {
        return { data: null, error: { message: "Session is missing.." } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  getAllUsers: async function (status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${APP_URL}/api/admin/users?status=${status}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      console.log(`${APP_URL}/api/admin/users?status=${status}`);

      const data = await res.json();
      console.log("users data1", data);

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  updateUserStatus: async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}/status`, {
      method: "PATCH",
      credentials: "include",
    });
    return res.json();
  },
  deleteUser: async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },

  restoreUser: async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      credentials: "include",
    });
    return res.json();
  },

  // getMe:async()=>{
  //   const res=await fetch()

  // }
};

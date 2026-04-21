import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      if (session.data === null) {
        return { data: null, error: { message: "Session is missing.." } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  getAllUsers: async function () {
    try {
      const res = await fetch(`${API_URL}/admin/users`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  updateUserStatus: async (id: string) => {
    const res = await fetch(`${API_URL}/admin/users/${id}/status`, {
      method: "PATCH",
      credentials: "include",
    });
    return res.json();
  },
  deleteUser: async (id: string) => {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};

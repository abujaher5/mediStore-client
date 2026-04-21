// import { env } from "@/env";

import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_URL;

export const medicineService = {
  getAllMedicines: async function () {
    try {
      // const url = new URL(`${API_URL}/medicines`);

      const res = await fetch(`${API_URL}/medicines`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  getMedicineDetails: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`);
      const data = await res.json();
      console.log(data, "from medicine service");
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          message: "Something went wrong...",
        },
      };
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

  updateUserStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
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

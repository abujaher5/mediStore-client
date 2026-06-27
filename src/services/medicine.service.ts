import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const medicineService = {
  // getAllMedicines: async function (params?: string, options?: ServiceOptions) {
  //   try {
  //     const url = new URL(`${API_URL}/api/medicines`);

  //     if (params) {
  //       Object.entries(params).forEach(([key, value]) => {
  //         if (value !== undefined && value !== null && value !== "") {
  //           url.searchParams.append(key, value);
  //         }
  //       });
  //     }

  //     const config: RequestInit = {};
  //     if (options?.cache) {
  //       config.cache = options.cache;
  //     }
  //     if (options?.revalidate) {
  //       config.next = { revalidate: options.revalidate };
  //     }
  //     const res = await fetch(url.toString(), { cache: "no-store" });
  //     const data = await res.json();

  //     return { data: data, error: null };
  //   } catch (error) {
  //     console.error(error);
  //     return { data: null, error: { message: "Something Went Wrong.." } };
  //   }
  // },

  // getAllMedicines: async (search?: string) => {
  //   const query = search ? `?search=${search}` : "";

  //   const res = await fetch(`${API_URL}/api/medicines${query}`, {
  //     cache: "no-store",
  //   });

  //   return res.json();
  // },

  getAllMedicines: async ({ search }: { search?: string }) => {
    const url = new URL(`${API_URL}/api/medicines`);

    if (search) {
      url.searchParams.append("search", search);
    }

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });
    return res.json();
  },

  getMedicineDetails: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${id}`);
      const data = await res.json();

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
      const res = await fetch(`${API_URL}/api/admin/users`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  updateUserStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
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
    const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },

  updateStock: async (id: string, stock: number) => {
    const res = await fetch(`${API_URL}/api/seller/medicines/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    });

    return res.json();
  },
};

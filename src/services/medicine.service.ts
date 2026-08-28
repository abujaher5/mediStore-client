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

  // getAllMedicines: async ({ search }: { search?: string }) => {
  //   const url = new URL(`${API_URL}/api/medicines`);

  //   if (search) {
  //     url.searchParams.append("search", search);
  //   }

  //   const res = await fetch(url.toString(), {
  //     cache: "no-store",
  //   });
  //   return res.json();
  // },

  getAllMedicines: async function ({
    page = 1,
    limit = 9,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    if (search) params.set("search", search);

    const url = `${API_URL}/api/medicines?${params.toString()}`;
    console.log("Fetching url", url);
    const res = await fetch(`${API_URL}/api/medicines?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.log("status", res.status);
      console.error("❌ Body:", errorBody);
      throw new Error(`${res.status}: ${errorBody}`);

      throw new Error("Failed to fetch medicines");
    }

    const result = await res.json();
    return {
      data: result.data,
      meta: result.meta,
    };
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

  updateStock: async (id: string, stock: number) => {
    const res = await fetch(`/api/seller/medicines/${id}`, {
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

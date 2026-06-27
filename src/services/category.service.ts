import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getAllCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/api/admin/categories`);

      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong.." } };
    }
  },

  updateCategory: async (id: string, name: string) => {
    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    return res.json();
  },

  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};

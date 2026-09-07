import { env } from "@/env";
import type {
  Categories,
  TCategoryResponse,
  TCreateCategoryPayload,
} from "@/types";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getAllCategories: async function (): Promise<{
    data: Categories[];
    error: { message: string } | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/api/admin/categories`, {
        cache: "no-store",
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: [], error: { message: "Something Went Wrong.." } };
    }
  },

  createCategory: async function (
    payload: TCreateCategoryPayload,
  ): Promise<TCategoryResponse> {
    const res = await fetch(`/api/admin/categories`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      const details = JSON.stringify(result?.details ?? "");
      const isDuplicate = details.includes("P2002");

      throw new Error(
        isDuplicate
          ? `A category named "${payload.name}" already exists.`
          : result?.message ||
              result?.error ||
              "Failed to add category, please try again..",
      );
    }

    return result;
  },

  updateCategory: async function (
    id: string,
    name: string,
  ): Promise<TCategoryResponse> {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message ||
          result?.error ||
          "Failed to update category, please try again..",
      );
    }

    return result;
  },

  deleteCategory: async function (id: string): Promise<TCategoryResponse> {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message ||
          result?.error ||
          "Failed to delete category, please try again..",
      );
    }

    return result;
  },
};

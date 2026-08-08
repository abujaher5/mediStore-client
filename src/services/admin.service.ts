export const adminService = {
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

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to restore user");
    }
    console.log(result);

    return result;
  },
};

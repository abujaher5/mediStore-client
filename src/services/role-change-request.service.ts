export const roleChangeRequestService = {
  createRequest: async (payload: { requestedRole?: string; reason?: string }) => {
    const res = await fetch(`/api/role-change-requests`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to submit role change request");
    }

    return result;
  },
  getMyRequests: async () => {
    const res = await fetch(`/api/role-change-requests/my-requests`, {
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to get your role change requests");
    }

    return result;
  },
  updateRequestRole: async (id: string, requestedRole: string) => {
    const res = await fetch(`/api/role-change-requests/${id}/role`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestedRole }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update requested role");
    }

    return result;
  },
  approveRequest: async (id: string) => {
    const res = await fetch(`/api/role-change-requests/${id}/approve`, {
      method: "PATCH",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to approve request");
    }

    return result;
  },
  rejectRequest: async (id: string) => {
    const res = await fetch(`/api/role-change-requests/${id}/reject`, {
      method: "PATCH",
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to reject request");
    }

    return result;
  },
};

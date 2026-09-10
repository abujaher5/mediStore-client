export interface RoleChangeRequest {
  id: string;
  userId: string;
  currentRole: string;
  requestedRole: string;
  reason?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
}

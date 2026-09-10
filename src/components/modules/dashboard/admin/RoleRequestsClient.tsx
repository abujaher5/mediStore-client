"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Loader2, Save, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roleChangeRequestService } from "@/services/role-change-request.service";
import { RoleChangeRequest } from "@/types";

const ROLE_OPTIONS = ["CUSTOMER", "SELLER", "ADMIN"];

export default function RoleRequestsClient({
  requests,
}: {
  requests: RoleChangeRequest[];
}) {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "PENDING";
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [editedRoles, setEditedRoles] = useState<Record<string, string>>({});

  const handleUpdateRole = async (id: string, newRole: string) => {
    try {
      setProcessingId(id);
      const result = await roleChangeRequestService.updateRequestRole(
        id,
        newRole,
      );
      if (result.success) {
        toast.success("Requested role updated successfully");
        setEditedRoles((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update requested role");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update requested role",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setProcessingId(id);
      const result = await roleChangeRequestService.approveRequest(id);
      if (result.success) {
        toast.success("Request approved. The user's role has been updated");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to approve request");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to approve request",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessingId(id);
      const result = await roleChangeRequestService.rejectRequest(id);
      if (result.success) {
        toast.success("Request rejected successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to reject request");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reject request",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Role Change Requests</h2>

        <Select
          value={currentStatus}
          onValueChange={(value) => {
            router.push(`/admin-dashboard/role-requests?status=${value}`);
            router.refresh();
          }}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="PENDING">Pending Requests</SelectItem>
            <SelectItem value="APPROVED">Approved Requests</SelectItem>
            <SelectItem value="REJECTED">Rejected Requests</SelectItem>
            <SelectItem value="ALL">All Requests</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>Role Change Requests</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Current Role</TableHead>
            <TableHead>Requested Role</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.user?.name}</TableCell>
              <TableCell>{request.user?.email}</TableCell>
              <TableCell>{request.currentRole}</TableCell>
              <TableCell>
                {request.status === "PENDING" ? (
                  <div className="flex items-center gap-1">
                    <Select
                      value={editedRoles[request.id] ?? request.requestedRole}
                      onValueChange={(value) =>
                        setEditedRoles((prev) => ({
                          ...prev,
                          [request.id]: value,
                        }))
                      }
                      disabled={processingId === request.id}
                    >
                      <SelectTrigger className="h-8 w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.filter(
                          (role) => role !== (request.user?.role ?? request.currentRole),
                        ).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {(editedRoles[request.id] ?? request.requestedRole) !==
                      request.requestedRole && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8 text-blue-600 hover:text-blue-700"
                        disabled={processingId === request.id}
                        onClick={() =>
                          handleUpdateRole(
                            request.id,
                            editedRoles[request.id] ?? request.requestedRole,
                          )
                        }
                      >
                        {processingId === request.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                ) : (
                  request.requestedRole
                )}
              </TableCell>
              <TableCell className="max-w-52">
                {request.reason ? (
                  <span className="line-clamp-2">{request.reason}</span>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {request.status === "PENDING" ? (
                  <Badge
                    variant="outline"
                    className="border-amber-500/40 bg-amber-500/5 text-amber-600"
                  >
                    PENDING
                  </Badge>
                ) : request.status === "APPROVED" ? (
                  <Badge variant="success">APPROVED</Badge>
                ) : (
                  <Badge variant="destructive-outline">REJECTED</Badge>
                )}
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(new Date(request.createdAt))}
              </TableCell>

              <TableCell>
                {request.status === "PENDING" ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      disabled={processingId === request.id}
                      onClick={() => handleApprove(request.id)}
                    >
                      {processingId === request.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={processingId === request.id}
                      onClick={() => handleReject(request.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Processed
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

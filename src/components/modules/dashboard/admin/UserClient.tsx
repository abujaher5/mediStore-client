"use client";
import { User } from "@/types";
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
import { Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminService } from "@/services/admin.service";

export default function UsersClient({ users }: { users: User[] }) {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "ACTIVE";
  const router = useRouter();
  const handleDelete = async (id: string) => {
    await adminService.deleteUser(id);
    toast.success("User deleted successfully.");
    router.refresh();
  };

  const handleRestoreUser = async (id: string) => {
    await adminService.restoreUser(id);
    toast.success("User restored successfully.");
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Users</h2>

        <Select
          value={currentStatus}
          onValueChange={(value) => {
            router.push(`/admin-dashboard/manage-users?status=${value}`);
            router.refresh();
          }}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ACTIVE">Active Users</SelectItem>

            <SelectItem value="DELETED">Deleted Users</SelectItem>

            <SelectItem value="ALL">All Users</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>Manage Users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>

              <TableCell>
                {user.status === "ACTIVE" ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestoreUser(user.id)}
                  >
                    Restore
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { useState } from "react";
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
import { Pencil, Trash2 } from "lucide-react";
import { medicineService } from "@/services/medicine.service";
import UpdateUserModal from "./UpdateUserModal";
import { useRouter } from "next/navigation";

export default function UsersClient({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const router = useRouter();
  const handleUpdateStatus = async (id: string, status: string) => {
    await medicineService.updateUserStatus(id, status);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await medicineService.deleteUser(id);
    router.refresh();
  };

  return (
    <div>
      <Table>
        <TableCaption>All Users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(user)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateUserModal
        open={open}
        onOpenChange={setOpen}
        user={selectedUser}
        onSubmit={handleUpdateStatus}
      />
    </div>
  );
}

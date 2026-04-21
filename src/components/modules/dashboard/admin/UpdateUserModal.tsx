/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UpdateUserModal({
  user,
  open,
  onOpenChange,
  onSubmit,
}: any) {
  const [status, setStatus] = useState(user?.status);

  // useEffect(() => {
  //   if (user) {
  //     setStatus(user.status);
  //   }
  // }, [user]);

  const handleUpdate = async () => {
    await onSubmit(user.id, status);
    console.log("Update button clicked", status);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white text-black rounded-md"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="BANNED">BANNED</option>
          </select>

          <button
            onClick={handleUpdate}
            className="bg-green-500 rounded-sm text-white px-3 py-1"
          >
            Update Status
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

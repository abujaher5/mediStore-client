"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderService } from "@/services/order.service";

interface Order {
  id: string;
  status: string;
}

const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function UpdateOrderStatusModal({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await orderService.updateOrderStatus(order.id, status);

      if (res.error) {
        throw new Error("Failed");
      }

      toast.success("Order status updated");

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update order");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className=" hover:bg-green-500">
          Update Status
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              {statuses.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="w-full " disabled={loading} onClick={handleUpdate}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

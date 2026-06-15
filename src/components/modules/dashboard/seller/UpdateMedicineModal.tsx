"use client";

import { useState } from "react";
import { Medicine } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  medicine: Medicine;
}

export default function UpdateMedicineModal({ medicine }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: medicine.name,
    price: medicine.price,
    stock: medicine.stock,
    manufacturer: medicine.manufacturer,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:5000/api/seller/medicines/${medicine.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    console.log(formData);

    const data = await res.json();

    if (res.ok) {
      toast.success("Updated successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.warning(data.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Medicine</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medicine Name"
          />

          <Input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <Input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
          />

          <Input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
          />

          <Button onClick={handleUpdate}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

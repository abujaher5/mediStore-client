"use client";

import { Medicine } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateStockModal from "./UpdateStockModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { medicineService } from "@/services/medicine.service";

const ManageStockTable = ({ data }: { data?: Medicine[] }) => {
  const router = useRouter();
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleOpenModal = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setOpen(true);
  };

  const handleUpdateStock = async (id: string, stock: number) => {
    await medicineService.updateStock(id, stock);
    toast.success("Stock updated successfully");
    router.refresh();
  };

  return (
    <div className="mx-auto">
      <Table>
        <TableCaption>Manage Stock</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Add New Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((medicine: Medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.id}</TableCell>
              <TableCell>{medicine.stock}</TableCell>

              <TableCell>
                <Button
                  size="sm"
                  onClick={() => handleOpenModal(medicine)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Update Stock
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateStockModal
        open={open}
        onOpenChange={setOpen}
        medicine={
          selectedMedicine
            ? {
                id: selectedMedicine.id,
                name: selectedMedicine.name,
                stock: selectedMedicine.stock,
              }
            : null
        }
        onSubmit={handleUpdateStock}
      />
    </div>
  );
};

export default ManageStockTable;

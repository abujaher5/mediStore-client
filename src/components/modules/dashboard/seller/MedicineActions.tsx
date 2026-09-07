"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { medicineService } from "@/services/medicine.service";
import type { Medicine, TUpdateMedicinePayload } from "@/types";

import DeleteMedicineModal from "./DeleteMedicineModal";
import UpdateMedicineModal from "./UpdateMedicineModal";

const MedicineActions = ({ medicine }: { medicine: Medicine }) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleUpdate = async (id: string, payload: TUpdateMedicinePayload) => {
    const toastId = toast.loading("Updating medicine...");

    try {
      await medicineService.updateMedicine(id, payload);
      toast.success("Medicine updated successfully.", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update medicine, please try again..",
        { id: toastId },
      );
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading(`Deleting "${medicine.name}"...`);

    try {
      await medicineService.deleteMedicine(id);
      toast.success("Medicine deleted successfully.", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete medicine, please try again..",
        { id: toastId },
      );
      throw error;
    }
  };

  return (
    <>
      <div className="flex justify-end gap-1.5">
        <Button
          variant="outline"
          size="icon-sm"
          title="Edit medicine"
          onClick={() => setEditOpen(true)}
        >
          <Pencil />
        </Button>

        <Button
          variant="destructive"
          size="icon-sm"
          title="Delete medicine"
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 />
        </Button>
      </div>

      <UpdateMedicineModal
        medicine={medicine}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={handleUpdate}
      />

      <DeleteMedicineModal
        medicine={medicine}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default MedicineActions;

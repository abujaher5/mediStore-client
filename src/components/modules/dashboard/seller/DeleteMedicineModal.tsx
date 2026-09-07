"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Medicine } from "@/types";

interface DeleteMedicineModalProps {
  medicine: Medicine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string) => Promise<void>;
}

const DeleteMedicineModal = ({
  medicine,
  open,
  onOpenChange,
  onSubmit,
}: DeleteMedicineModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!medicine) return;

    try {
      setLoading(true);
      await onSubmit(medicine.id);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete medicine?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete
            <span className="font-medium text-foreground">
              {medicine ? ` "${medicine.name}"` : " this medicine"}
            </span>
            from your listings. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteMedicineModal };
export default DeleteMedicineModal;

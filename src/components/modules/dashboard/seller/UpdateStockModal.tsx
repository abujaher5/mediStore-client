"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicine: { id: string; name: string; stock: number } | null;
  onSubmit: (id: string, stock: number) => Promise<void> | void;
};

const UpdateStockModal = ({
  open,
  onOpenChange,
  medicine,
  onSubmit,
}: Props) => {
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill with current stock when modal opens
  useEffect(() => {
    if (open) {
      setStock(String(medicine?.stock ?? ""));
    }
  }, [open, medicine]);

  const handleSubmit = async () => {
    if (!medicine) return;
    setLoading(true);
    try {
      await onSubmit(medicine.id, Number(stock));
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-1">
          {/* Read-only medicine name for context */}
          <Field>
            <FieldLabel>Medicine</FieldLabel>
            <Input value={medicine?.name ?? ""} disabled />
          </Field>

          <Field>
            <FieldLabel>
              Stock Quantity <span className="text-red-500 ml-0.5">*</span>
            </FieldLabel>
            <Input
              type="number"
              min={0}
              placeholder="Enter new stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Field>

          <Button
            onClick={handleSubmit}
            disabled={loading || !stock}
            className="bg-green-500 hover:bg-green-600 text-white w-full"
          >
            {loading ? "Updating..." : "Update Stock"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStockModal;

"use client";

import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Medicine } from "@/types";

interface UpdateMedicineModalProps {
  medicine: Medicine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    id: string,
    payload: {
      name: string;
      price: number;
      stock: number;
      manufacturer: string;
    },
  ) => Promise<boolean>;
}

const UpdateMedicineModal = ({
  medicine,
  open,
  onOpenChange,
  onSubmit,
}: UpdateMedicineModalProps) => {
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && medicine) {
      setName(medicine.name);
      setManufacturer(medicine.manufacturer);
      setPrice(String(medicine.price));
      setStock(String(medicine.stock));
      setError(null);
    }
  }, [open, medicine]);

  const validate = () => {
    if (!name.trim() || name.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }
    if (!manufacturer.trim() || manufacturer.trim().length < 2) {
      return "Manufacturer must be at least 2 characters.";
    }
    if (price === "" || isNaN(Number(price)) || Number(price) <= 0) {
      return "Enter a valid price greater than 0.";
    }
    if (
      stock === "" ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return "Enter a valid stock quantity (whole number, 0 or more).";
    }
    return null;
  };

  const handleUpdate = async () => {
    if (!medicine) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const success = await onSubmit(medicine.id, {
        name: name.trim(),
        price: Number(price),
        stock: Math.trunc(Number(stock)),
        manufacturer: manufacturer.trim(),
      });
      if (success) {
        onOpenChange(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const isUnchanged =
    !!medicine &&
    name === medicine.name &&
    manufacturer === medicine.manufacturer &&
    price === String(medicine.price) &&
    stock === String(medicine.stock);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Medicine</DialogTitle>
          <DialogDescription>
            Update details for
            <span className="font-medium text-foreground">
              {medicine ? ` "${medicine.name}"` : " this medicine"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="update-medicine-name">Name</FieldLabel>
            <Input
              id="update-medicine-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              disabled={loading}
              maxLength={100}
              placeholder="Medicine name"
            />
          </Field>

          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="update-medicine-manufacturer">
              Manufacturer
            </FieldLabel>
            <Input
              id="update-medicine-manufacturer"
              value={manufacturer}
              onChange={(e) => {
                setManufacturer(e.target.value);
                setError(null);
              }}
              disabled={loading}
              maxLength={50}
              placeholder="Manufacturer"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="update-medicine-price">Price ($)</FieldLabel>
              <Input
                id="update-medicine-price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setError(null);
                }}
                disabled={loading}
                placeholder="0.00"
              />
            </Field>

            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="update-medicine-stock">Stock</FieldLabel>
              <Input
                id="update-medicine-stock"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  setError(null);
                }}
                disabled={loading}
                placeholder="0"
              />
            </Field>
          </div>

          {medicine?.description && (
            <Field>
              <FieldLabel htmlFor="update-medicine-description">
                Description (read-only)
              </FieldLabel>
              <Textarea
                id="update-medicine-description"
                value={medicine.description}
                rows={3}
                disabled
              />
            </Field>
          )}

          {error && <FieldError>{error}</FieldError>}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={loading || isUnchanged || !name.trim() || !price || !stock}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMedicineModal;

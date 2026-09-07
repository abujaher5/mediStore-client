"use client";

import { Loader2, Minus, Package, Plus, Save } from "lucide-react";
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
import type { Medicine } from "@/types";

interface UpdateStockModalProps {
  medicine: Medicine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, stock: number) => Promise<boolean>;
}

const QUICK_ADJUSTMENTS = [10, 50, 100];

const UpdateStockModal = ({
  medicine,
  open,
  onOpenChange,
  onSubmit,
}: UpdateStockModalProps) => {
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && medicine) {
      setStock(String(medicine.stock));
      setError(null);
    }
  }, [open, medicine]);

  const validate = (value: string) => {
    if (value === "" || !Number.isInteger(Number(value)) || Number(value) < 0) {
      return "Enter a valid stock quantity (whole number, 0 or more).";
    }
    if (Number(value) > 1000000) {
      return "Stock cannot exceed 1,000,000.";
    }
    return null;
  };

  const adjustStock = (delta: number) => {
    const current = Number(stock) || 0;
    const next = Math.max(0, Math.min(1000000, current + delta));
    setStock(String(next));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!medicine) return;

    const validationError = validate(stock);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const success = await onSubmit(medicine.id, Number(stock));
      if (success) {
        onOpenChange(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const currentStock = medicine?.stock ?? 0;
  const newStock = Number(stock);
  const stockDelta = stock !== "" ? newStock - currentStock : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
          <DialogDescription>
            Set the new stock quantity for
            <span className="font-medium text-foreground">
              {medicine ? ` "${medicine.name}"` : " this medicine"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
              {medicine?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={medicine.imageUrl}
                  alt={medicine.name}
                  className="size-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              ) : (
                <Package className="size-4 text-muted-foreground" />
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{medicine?.name}</p>
              <p className="text-xs text-muted-foreground">
                Current stock: {currentStock} units
              </p>
            </div>
          </div>

          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="update-stock-input">New Stock Quantity</FieldLabel>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={loading || Number(stock) <= 0}
                onClick={() => adjustStock(-10)}
                title="Remove 10 units"
              >
                <Minus />
              </Button>
              <Input
                id="update-stock-input"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                disabled={loading}
                className="text-center tabular-nums"
                placeholder="0"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={loading || Number(stock) >= 1000000}
                onClick={() => adjustStock(10)}
                title="Add 10 units"
              >
                <Plus />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs text-muted-foreground">
                Quick add:
              </span>
              {QUICK_ADJUSTMENTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  disabled={loading}
                  onClick={() => adjustStock(amount)}
                  className="rounded-full border px-2.5 py-0.5 text-xs transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                >
                  +{amount}
                </button>
              ))}
              <button
                type="button"
                disabled={loading || currentStock === 0}
                onClick={() => {
                  setStock("0");
                  setError(null);
                }}
                className="rounded-full border border-destructive/40 px-2.5 py-0.5 text-xs text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
              >
                Set to 0
              </button>
            </div>

            {stock !== "" &&
              !error &&
              (stockDelta > 0 ? (
                <p className="text-xs text-green-600">
                  Increases stock by {stockDelta} to {newStock} units.
                </p>
              ) : stockDelta < 0 ? (
                <p className="text-xs text-destructive">
                  Decreases stock by {Math.abs(stockDelta)} to {newStock} units.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Same as current stock.
                </p>
              ))}

            {error && <FieldError>{error}</FieldError>}
          </Field>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || stock === "" || stockDelta === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save />
                  Update Stock
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStockModal;

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
import type { Categories } from "@/types";

interface UpdateCategoryModalProps {
  category: Categories | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, name: string) => Promise<void>;
}

const UpdateCategoryModal = ({
  category,
  open,
  onOpenChange,
  onSubmit,
}: UpdateCategoryModalProps) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(category?.name || "");
    setError(null);
  }, [category, open]);

  const handleUpdate = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setError("Category name must be between 2 and 50 characters.");
      return;
    }

    if (!category) return;

    try {
      setLoading(true);
      await onSubmit(category.id, trimmedName);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Update the name for
            <span className="font-medium text-foreground">
              {category?.name ? ` "${category.name}"` : " this category"}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="update-category-name">Name</FieldLabel>
            <Input
              id="update-category-name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUpdate();
                }
              }}
              maxLength={50}
              disabled={loading}
              placeholder="e.g. Antibiotics"
              autoFocus
            />
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
              onClick={handleUpdate}
              disabled={loading || !name.trim() || name.trim() === category?.name}
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

export default UpdateCategoryModal;

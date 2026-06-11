/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const UpdateCategoryModal = ({
  category,
  open,
  onOpenChange,
  onSubmit,
}: any) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(category?.name || "");
  }, [category]);

  const handleUpdate = async () => {
    await onSubmit(category.id, name);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          <button
            onClick={handleUpdate}
            className="bg-green-500 rounded-sm text-white px-3 py-1"
          >
            Update Category
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;

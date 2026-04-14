"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AddMedicineForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      manufacturer: formData.get("manufacturer"),
      categoryId: formData.get("categoryId"),
      imageUrl: formData.get("imageUrl"),
    };

    try {
      const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      alert("Medicine added successfully ✅");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Add Medicine</CardTitle>
          <CardDescription>Fill the form to add a new medicine</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input name="name" required />
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea name="description" required />
              </Field>

              <Field>
                <FieldLabel>Price</FieldLabel>
                <Input type="number" step="0.01" name="price" required />
              </Field>

              <Field>
                <FieldLabel>Stock</FieldLabel>
                <Input type="number" name="stock" required />
              </Field>

              <Field>
                <FieldLabel>Manufacturer</FieldLabel>
                <Input name="manufacturer" required />
              </Field>

              <Field>
                <FieldLabel>Category ID</FieldLabel>
                <Input name="categoryId" required />
              </Field>

              <Field>
                <FieldLabel>Image URL</FieldLabel>
                <Input
                  type="text"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Medicine"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

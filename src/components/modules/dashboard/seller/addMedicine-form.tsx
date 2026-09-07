"use client";

import { useForm } from "@tanstack/react-form";
import {
  CheckCircle2,
  DollarSign,
  ImagePlus,
  Loader2,
  Package,
  Pill,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { medicineService } from "@/services/medicine.service";
import type { Categories } from "@/types";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Medicine name must be at least 2 characters.")
    .max(100, "Medicine name cannot exceed 100 characters."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(2000, "Description cannot exceed 2000 characters."),
  price: z
    .string()
    .refine(
      (v) => v !== "" && !isNaN(Number(v)) && Number(v) > 0,
      "Enter a valid price greater than 0.",
    )
    .refine(
      (v) => Number(v) <= 100000,
      "Price cannot exceed 100,000.",
    ),
  stock: z
    .string()
    .refine(
      (v) =>
        v !== "" &&
        !isNaN(Number(v)) &&
        Number.isInteger(Number(v)) &&
        Number(v) >= 0,
      "Enter a valid stock quantity (whole number, 0 or more).",
    )
    .refine(
      (v) => Number(v) <= 1000000,
      "Stock cannot exceed 1,000,000.",
    ),
  manufacturer: z
    .string()
    .trim()
    .min(2, "Manufacturer must be at least 2 characters.")
    .max(50, "Manufacturer cannot exceed 50 characters."),
  categoryId: z.string().min(1, "Please select a category."),
  imageUrl: z.url("Enter a valid image URL (e.g. https://...)."),
});

interface AddMedicineFormProps extends React.ComponentProps<"div"> {
  categories: Categories[];
}

export function AddMedicineForm({
  categories,
  className,
  ...props
}: AddMedicineFormProps) {
  const [loading, setLoading] = useState(false);
  const [addedMedicines, setAddedMedicines] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      manufacturer: "",
      categoryId: "",
      imageUrl: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(`Adding "${value.name}"...`);

      try {
        setLoading(true);

        const payload = {
          name: value.name.trim(),
          description: value.description.trim(),
          price: Number(value.price),
          stock: Math.trunc(Number(value.stock)),
          manufacturer: value.manufacturer.trim(),
          categoryId: value.categoryId,
          imageUrl: value.imageUrl.trim(),
        };

        await medicineService.createMedicine(payload);

        toast.success(`Medicine "${value.name}" added successfully.`, {
          id: toastId,
          action: {
            label: "View all",
            onClick: () => router.push("/seller-dashboard/my-medicines"),
          },
        });

        setAddedMedicines((prev) => [value.name, ...prev]);
        form.reset();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to add medicine, please try again..",
          { id: toastId },
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Pill className="size-4" />
            </span>
            Medicine Details
          </CardTitle>
          <CardDescription>
            Provide clear, accurate information about the medicine you are
            listing.
          </CardDescription>
          <CardAction>
            <Badge variant="secondary">
              <Package className="size-3" />
              {addedMedicines.length} added this session
            </Badge>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            id="add-medicine-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="grid gap-7 sm:grid-cols-2">
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                          type="text"
                          name={field.name}
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="e.g. Paracetamol 500mg"
                          maxLength={100}
                          disabled={loading}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="manufacturer">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Manufacturer</FieldLabel>
                        <Input
                          type="text"
                          name={field.name}
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="e.g. Square Pharmaceuticals"
                          maxLength={50}
                          disabled={loading}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="price">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
                        <div className="relative">
                          <DollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            name={field.name}
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            placeholder="0.00"
                            disabled={loading}
                            className="pl-9"
                          />
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="stock">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                        <Input
                          type="number"
                          min="0"
                          step="1"
                          name={field.name}
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="e.g. 100"
                          disabled={loading}
                        />
                        <FieldDescription>
                          Available units in your inventory.
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="categoryId">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.handleChange(value)}
                          disabled={loading}
                        >
                          <SelectTrigger
                            id={field.name}
                            className="w-full"
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="imageUrl">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                        <Input
                          type="url"
                          name={field.name}
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="https://example.com/image.jpg"
                          disabled={loading}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              <form.Field name="description">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <Textarea
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Describe the medicine, its uses, dosage instructions, etc."
                        rows={4}
                        maxLength={2000}
                        disabled={loading}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Subscribe
                selector={(state) => ({
                  name: state.values.name,
                  categoryId: state.values.categoryId,
                  imageUrl: state.values.imageUrl,
                  price: state.values.price,
                  stock: state.values.stock,
                })}
              >
                {({ name, categoryId, imageUrl, price, stock }) => {
                  const selectedCategory = categories.find(
                    (category) => category.id === categoryId,
                  );

                  return (
                  <div className="flex items-center gap-4 rounded-lg border bg-muted/40 p-4">
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="size-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          onLoad={(e) => {
                            e.currentTarget.style.display = "block";
                          }}
                        />
                      ) : (
                        <ImagePlus className="size-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {name.trim() || "Medicine preview"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {categoryId
                          ? selectedCategory?.name
                          : "No category selected"}
                        {price !== "" && !isNaN(Number(price)) && Number(price) > 0
                          ? ` - $${Number(price).toFixed(2)}`
                          : ""}
                        {stock !== "" && !isNaN(Number(stock))
                          ? ` - ${Number(stock)} in stock`
                          : ""}
                      </p>
                    </div>
                  </div>
                  );
                }}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <form.Subscribe selector={(state) => state.isPristine}>
            {(isPristine) => (
              <div className="flex w-full gap-2">
                <Button
                  type="submit"
                  form="add-medicine-form"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Pill />
                      Add Medicine
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading || isPristine}
                >
                  <RotateCcw />
                  Reset
                </Button>
              </div>
            )}
          </form.Subscribe>

          <FieldDescription className="text-center">
            Want to review or edit your listings?
            <Link
              href="/seller-dashboard/my-medicines"
              className="pl-1 font-semibold underline-offset-4 hover:underline"
            >
              My medicines
            </Link>
          </FieldDescription>
        </CardFooter>
      </Card>

      {addedMedicines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="size-4 text-green-500" />
              Added in this session
            </CardTitle>
            <CardDescription>
              Keep adding more, or review them on the My Medicines page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {addedMedicines.map((name, index) => (
              <Badge key={`${name}-${index}`} variant="success">
                {name}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

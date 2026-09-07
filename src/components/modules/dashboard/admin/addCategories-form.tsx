"use client";

import { useForm } from "@tanstack/react-form";
import {
  CheckCircle2,
  FolderPlus,
  Loader2,
  RotateCcw,
  Sparkles,
  Tag,
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
import { categoryService } from "@/services/category.service";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(50, "Category name cannot exceed 50 characters."),
});

const CATEGORY_SUGGESTIONS = [
  "Antibiotics",
  "Pain Relief",
  "Vitamins",
  "Skincare",
  "First Aid",
  "Digestive Health",
];

const AddCategoriesForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [loading, setLoading] = useState(false);
  const [addedCategories, setAddedCategories] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(`Adding "${value.name}" category...`);

      try {
        setLoading(true);

        await categoryService.createCategory({ name: value.name });

        toast.success(`Category "${value.name}" added successfully.`, {
          id: toastId,
          action: {
            label: "View all",
            onClick: () =>
              router.push("/admin-dashboard/manage-categories"),
          },
        });

        setAddedCategories((prev) => [value.name, ...prev]);
        form.reset();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to add category, please try again..",
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
              <FolderPlus className="size-4" />
            </span>
            New Category
          </CardTitle>
          <CardDescription>
            Give your category a clear, recognizable name.
          </CardDescription>
          <CardAction>
            <Badge variant="secondary">
              <Tag className="size-3" />
              {addedCategories.length} added this session
            </Badge>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            id="add-category-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  const value = field.state.value;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                      <div className="relative">
                        <Input
                          type="text"
                          name={field.name}
                          id={field.name}
                          value={value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="e.g. Antibiotics"
                          maxLength={50}
                          disabled={loading}
                          className="pr-14"
                          autoComplete="off"
                        />
                        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground tabular-nums">
                          {value.length}/50
                        </span>
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}

                      <FieldDescription>
                        Must be unique. Shown to customers when browsing
                        medicines.
                      </FieldDescription>

                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Sparkles className="size-3" />
                          Quick pick:
                        </span>
                        {CATEGORY_SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            disabled={loading}
                            onClick={() => field.handleChange(suggestion)}
                            className={cn(
                              "rounded-full border px-2.5 py-0.5 text-xs transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary disabled:pointer-events-none disabled:opacity-50",
                              value === suggestion &&
                                "border-primary bg-primary/10 text-primary",
                            )}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>

                      <div className="mt-2 flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Tag className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {value.trim() || "Category preview"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Appears in the store category list
                          </p>
                        </div>
                      </div>
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <form.Subscribe selector={(state) => state.values.name}>
            {(currentName) => (
              <div className="flex w-full gap-2">
                <Button
                  type="submit"
                  form="add-category-form"
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
                      <FolderPlus />
                      Add Category
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading || !currentName}
                >
                  <RotateCcw />
                  Reset
                </Button>
              </div>
            )}
          </form.Subscribe>

          <FieldDescription className="text-center">
            Want to edit or remove existing categories?
            <Link
              href="/admin-dashboard/manage-categories"
              className="pl-1 font-semibold underline-offset-4 hover:underline"
            >
              Manage categories
            </Link>
          </FieldDescription>
        </CardFooter>
      </Card>

      {addedCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="size-4 text-green-500" />
              Added in this session
            </CardTitle>
            <CardDescription>
              Keep adding more, or review them on the manage categories page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {addedCategories.map((name, index) => (
              <Badge key={`${name}-${index}`} variant="success">
                {name}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddCategoriesForm;

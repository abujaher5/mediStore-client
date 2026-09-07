import {
  ArrowRight,
  CircleAlert,
  Lightbulb,
  ListChecks,
  Pill,
  Tag,
} from "lucide-react";
import Link from "next/link";

import { AddMedicineForm } from "@/components/modules/dashboard/seller/addMedicine-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categoryService } from "@/services/category.service";

const TIPS = [
  "Use the exact brand and strength in the name (e.g. Paracetamol 500mg).",
  "A clear image builds customer trust - use a direct image URL.",
  "Set an accurate stock count to avoid overselling.",
  "Write a helpful description with uses and dosage guidance.",
];

const AddMedicinePage = async () => {
  const { data: categories } = await categoryService.getAllCategories();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Pill className="size-5" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-semibold tracking-tight">
              Add Medicine
            </h1>
            <p className="text-sm text-muted-foreground">
              List a new medicine in your store with full details and pricing.
            </p>
          </div>
        </div>

        <Button asChild variant="outline">
          <Link href="/seller-dashboard/my-medicines">
            <ListChecks />
            My Medicines
          </Link>
        </Button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          {categories?.length ? (
            <AddMedicineForm categories={categories} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleAlert className="size-5 text-yellow-500" />
                  No categories available
                </CardTitle>
                <CardDescription>
                  Medicines must be listed under a category. Ask an admin to
                  create categories first, then come back to add your medicine.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href="/categories">
                    <Tag />
                    Browse categories
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <Tag className="size-4 text-primary" />
                  Categories
                </span>
                <Badge variant="secondary">
                  {categories?.length ?? 0} total
                </Badge>
              </CardTitle>
              <CardDescription>
                Pick from these when filling the form.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {categories?.length ? (
                categories.map((category) => (
                  <Badge key={category.id} variant="outline">
                    {category.name}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No categories yet.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="size-4 text-yellow-500" />
                Tips for good listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {TIPS.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
              <Link
                href="/seller-dashboard/my-medicines"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                View my medicines
                <ArrowRight className="size-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddMedicinePage;

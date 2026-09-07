import {
  ArrowRight,
  CircleHelp,
  FolderPlus,
  Lightbulb,
  ListChecks,
  Tag,
} from "lucide-react";
import Link from "next/link";

import AddCategoriesForm from "@/components/modules/dashboard/admin/addCategories-form";
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
  "Keep names short and clear (2-50 characters).",
  "Use familiar terms customers search for, e.g. Pain Relief.",
  "Avoid duplicates - every category name must be unique.",
  "One category per broad medicine group works best.",
];

const AddCategoriesPage = async () => {
  const { data: categories } = await categoryService.getAllCategories();

  const recentCategories = [...(categories || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderPlus className="size-5" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-semibold tracking-tight">
              Add Categories
            </h1>
            <p className="text-sm text-muted-foreground">
              Create categories to organize and group medicines in your store.
            </p>
          </div>
        </div>

        <Button asChild variant="outline">
          <Link href="/admin-dashboard/manage-categories">
            <ListChecks />
            Manage Categories
          </Link>
        </Button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <AddCategoriesForm />

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <Tag className="size-4 text-primary" />
                  Existing Categories
                </span>
                <Badge variant="secondary">
                  {categories?.length ?? 0} total
                </Badge>
              </CardTitle>
              <CardDescription>Most recently added categories.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {recentCategories?.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    {recentCategories.map((category) => (
                      <Badge key={category.id} variant="outline">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href="/admin-dashboard/manage-categories"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    View all categories
                    <ArrowRight className="size-3.5" />
                  </Link>
                </>
              ) : (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CircleHelp className="size-4 shrink-0" />
                  No categories yet. Add your first one to get started.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="size-4 text-yellow-500" />
                Tips for good categories
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddCategoriesPage;

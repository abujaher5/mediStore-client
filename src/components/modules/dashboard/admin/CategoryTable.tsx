"use client";

import { Loader2, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryService } from "@/services/category.service";
import type { Categories } from "@/types";

import UpdateCategoryModal from "./UpdateCategoryModal";

export const CategoryTable = ({ categories }: { categories: Categories[] }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Categories | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleOpenModal = (category: Categories) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    const toastId = toast.loading("Updating category...");

    try {
      await categoryService.updateCategory(id, name);
      toast.success("Category updated successfully.", { id: toastId });
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update category, please try again..",
        { id: toastId },
      );
    }
  };

  const handleDelete = async (category: Categories) => {
    setDeletingId(category.id);
    const toastId = toast.loading(`Deleting "${category.name}"...`);

    try {
      await categoryService.deleteCategory(category.id);
      toast.success("Category deleted successfully.", { id: toastId });
      setDeleteTarget(null);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete category, please try again..",
        { id: toastId },
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manage Categories
          </h1>
          <p className="text-sm text-muted-foreground">
            Update or remove existing medicine categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Tag className="size-3" />
            {categories?.length ?? 0} total
          </Badge>
          <Button asChild size="sm">
            <Link href="/admin-dashboard/add-categories">
              <Plus />
              Add Category
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14 text-center">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.length ? (
              categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell className="text-center text-muted-foreground tabular-nums">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {category.name}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {new Date(category.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        title="Update category"
                        onClick={() => handleOpenModal(category)}
                      >
                        <Pencil />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon-sm"
                        title="Delete category"
                        disabled={deletingId === category.id}
                        onClick={() => setDeleteTarget(category)}
                      >
                        {deletingId === category.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Trash2 />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-28 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Tag className="size-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      No categories found.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin-dashboard/add-categories">
                        <Plus />
                        Add your first category
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UpdateCategoryModal
        open={open}
        onOpenChange={setOpen}
        category={selectedCategory}
        onSubmit={handleUpdateCategory}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(value) => !value && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete
              <span className="font-medium text-foreground">
                {deleteTarget ? ` "${deleteTarget.name}"` : " this category"}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!!deletingId}
              onClick={(e) => {
                e.preventDefault();
                if (deleteTarget) handleDelete(deleteTarget);
              }}
            >
              {deletingId ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryTable;

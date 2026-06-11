"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { categoryService } from "@/services/category.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { useState } from "react";

interface Categories {
  name: string;
  id: string;
}
export const CategoryTable = ({ categories }: { categories: Categories[] }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleOpenModal = (category: Categories) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleUpdateCategory = async (id: string, name: string) => {
    await categoryService.updateCategory(id, name);
    toast.success("Status update successfully");
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await categoryService.deleteCategory(id);
    toast.success("Category Deleted Successfully..");
    router.refresh();
  };
  return (
    <div>
      <Table>
        <TableCaption>All Categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category: Categories) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(category)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateCategoryModal
        open={open}
        onOpenChange={setOpen}
        category={selectedCategory}
        onSubmit={handleUpdateCategory}
      />
    </div>
  );
};

export default CategoryTable;

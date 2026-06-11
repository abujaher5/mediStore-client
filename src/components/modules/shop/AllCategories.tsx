import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categoryService } from "@/services/category.service";
import { Categories } from "@/types";
import CopyCategoryId from "./CopyCategoryId";

const AllCategories = async () => {
  const { data: categories } = await categoryService.getAllCategories();

  return (
    <div className="mx-auto">
      <Table>
        <TableCaption>All Categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>id</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>UpdatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category: Categories) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell className="flex justify-between ">
                {category.id}
                <CopyCategoryId category={category} />
              </TableCell>
              <TableCell>
                {new Date(category.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(category.updatedAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllCategories;

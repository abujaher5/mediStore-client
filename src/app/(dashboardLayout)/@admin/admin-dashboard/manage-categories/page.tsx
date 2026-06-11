import CategoryTable from "@/components/modules/dashboard/admin/CategoryTable";
import { categoryService } from "@/services/category.service";

// interface Categories {
//   name: string;
//   id: string;
// }

const ManageCategoriesPage = async () => {
  const { data } = await categoryService.getAllCategories();
  return <CategoryTable categories={data} />;
};

export default ManageCategoriesPage;

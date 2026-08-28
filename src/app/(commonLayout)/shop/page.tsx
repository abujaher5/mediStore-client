import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { PaginationControls } from "@/components/modules/shop/PaginationControls";
import SearchInput from "@/components/modules/shop/SearchInput";

import { medicineService } from "@/services/medicine.service";

import { Medicine } from "@/types";
import Link from "next/link";

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.search || "";

  const { data: medicines, meta } = await medicineService
    .getAllMedicines({ page: currentPage, limit: 9, search })
    .catch(() => ({
      data: [],
      meta: { totalItems: 0, totalPages: 1, currentPage: 1, itemsPerPage: 9 },
    }));

  return (
    <div className="container mx-auto flex flex-col items-center gap-5 lg:px-10">
      <SearchInput />
      <div className="flex justify-end items-end  lg:ml-180 md:ml-130  text-center bg-gray-400 p-1.5 rounded-sm dark:hover:bg-gray-600 hover:bg-transparent">
        <Link href={"/categories"}>Show All Categories</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {medicines?.map((medicine: Medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>

      {meta?.totalPages > 1 && (
        <PaginationControls
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          totalItems={meta.totalItems}
          itemsPerPage={meta.itemsPerPage}
        />
      )}
    </div>
  );
};

export default ShopPage;

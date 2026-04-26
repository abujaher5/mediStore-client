import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import SearchInput from "@/components/modules/shop/SearchInput";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";

type Props = {
  searchParams: Promise<{ search?: string }>;
};

const ShopPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const search = params?.search || "";
  const data = await medicineService.getAllMedicines({ search });

  return (
    <div className="container mx-auto flex flex-col items-center gap-10 lg:px-10">
      <SearchInput />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {data?.map((medicine: Medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

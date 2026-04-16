import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";

const ShopPage = async () => {
  const { data } = await medicineService.getAllMedicines();

  return (
    <div className="container mx-auto flex flex-col items-center gap-10 lg:px-10">
      <div className="py-4 flex items-center  gap-4">
        <div>Filter by</div>
        <div>
          <input
            type="text"
            className="border-2 py-1 px-2 rounded-md"
            placeholder="Search Medicine"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {data?.map((medicine: Medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

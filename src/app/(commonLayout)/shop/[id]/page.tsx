import MedicineDetails from "@/components/modules/shop/MedicineDetails";
import { medicineService } from "@/services/medicine.service";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await medicineService.getMedicineDetails(id);

  return (
    <div>
      <MedicineDetails medicine={data} />
    </div>
  );
};

export default MedicineDetailsPage;

import { medicineService } from "@/services/medicine.service";
// import { Medicine } from "@/types";

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const { data } = await medicineService.getMedicineDetails();
//   return data?.data
//     ?.map((medicine: Medicine) => ({ id: medicine.id }))
//     .splice(0, 3);
// }

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await medicineService.getMedicineDetails(id);

  console.log(data);

  return (
    <div>
      <h2>{id}</h2>
      <h2>{data?.name}</h2>
    </div>
  );
};

export default MedicineDetailsPage;

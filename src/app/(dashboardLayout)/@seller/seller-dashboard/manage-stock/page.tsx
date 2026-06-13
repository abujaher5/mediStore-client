import ManageStockTable from "@/components/modules/dashboard/seller/ManageStockTable";
import { sellerService } from "@/services/seller.service";

const ManageStockPage = async () => {
  const { data } = await sellerService.myMedicines();
  return (
    <div>
      <ManageStockTable data={data} />
    </div>
  );
};

export default ManageStockPage;

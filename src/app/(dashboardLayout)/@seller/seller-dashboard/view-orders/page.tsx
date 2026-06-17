import SellerOrdersTable from "@/components/modules/dashboard/seller/SellerOrdersTable";
import { sellerService } from "@/services/seller.service";

const SellerOrdersPage = async () => {
  const { data: orders } = await sellerService.getOrderedMedicines();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orders For My Medicines</h2>

      <SellerOrdersTable orders={orders} />
    </div>
  );
};

export default SellerOrdersPage;

import { sellerService } from "@/services/seller.service";
import ManageOrdersTable from "@/components/modules/dashboard/seller/ManageOrderTable";

const ManageOrdersPage = async () => {
  const { data: orders } = await sellerService.getOrderedMedicines();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      <ManageOrdersTable orders={orders} />
    </div>
  );
};

export default ManageOrdersPage;

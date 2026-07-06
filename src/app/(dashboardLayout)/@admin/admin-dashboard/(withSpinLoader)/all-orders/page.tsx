import AllOrdersList from "@/components/modules/dashboard/admin/AllOrdersList";
import { orderService } from "@/services/order.service";

const AllOrdersPage = async () => {
  const { data: orders } = await orderService.getAllOrders();

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>
        <h1 className="text-2xl font-bold mb-6">
          Total Orders: {orders?.length}
        </h1>
      </div>

      <AllOrdersList orders={orders} />
    </div>
  );
};

export default AllOrdersPage;

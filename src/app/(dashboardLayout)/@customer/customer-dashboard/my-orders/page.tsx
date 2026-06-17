import MyOrdersList from "@/components/modules/dashboard/customer/MyOrdersList";
import { sellerService } from "@/services/seller.service";

const MyOrdersPage = async () => {
  const { data: orders } = await sellerService.getMyOrders();
  console.log(orders.data, "from page");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <MyOrdersList orders={orders.data} />
    </div>
  );
};

export default MyOrdersPage;

import { Profile } from "@/components/modules/dashboard/shared/Profile/Profile";

import SellerDashboardStats from "@/components/modules/dashboard/seller/SellerStats";
import { sellerService } from "@/services/seller.service";

const SellerDashboard = async () => {
  const { data } = await sellerService.getDashboardStats();

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center  mb-5">
        Your Dashboard.
      </h2>

      <SellerDashboardStats stats={data} />
      <Profile />
    </div>
  );
};

export default SellerDashboard;

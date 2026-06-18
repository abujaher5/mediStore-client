import { Profile } from "@/components/modules/dashboard/shared/Profile/Profile";
import SellerDashboardStats from "@/components/modules/dashboard/seller/SellerStats";
import { sellerService } from "@/services/seller.service";

import { LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SellerDashboard = async () => {
  const { data } = await sellerService.getDashboardStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-lg bg-primary/10">
          <LayoutDashboard className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Seller Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with my store.
          </p>
        </div>
      </div>

      <Separator />

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Overview
        </h3>
        <SellerDashboardStats stats={data} />
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Account
        </h3>
        <Profile />
      </section>
    </div>
  );
};

export default SellerDashboard;

import { LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import CustomerDashboardStats from "@/components/modules/dashboard/customer/CustomerStats";
import { Suspense } from "react";
import { DashboardCardSkeleton } from "@/components/modules/dashboard/shared/Loader/DashboardCardSkeleton";

const CustomerDashboard = async () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-lg bg-primary/10">
          <LayoutDashboard className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Customer Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            A quick overview of your shopping activity, orders, spending, and
            account progress.
          </p>
        </div>
      </div>

      <Separator />

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Overview
        </h3>

        <Suspense fallback={<DashboardCardSkeleton />}>
          <CustomerDashboardStats />
        </Suspense>
      </section>
    </div>
  );
};

export default CustomerDashboard;

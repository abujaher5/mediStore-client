import { Boxes } from "lucide-react";

import ManageStockTable from "@/components/modules/dashboard/seller/ManageStockTable";
import { sellerService } from "@/services/seller.service";

const ManageStockPage = async () => {
  const { data } = await sellerService.myMedicines();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Boxes className="size-5" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold tracking-tight">Manage Stock</h1>
          <p className="text-sm text-muted-foreground">
            Track stock levels and keep your inventory up to date.
          </p>
        </div>
      </div>

      <ManageStockTable data={data ?? []} />
    </div>
  );
};

export default ManageStockPage;

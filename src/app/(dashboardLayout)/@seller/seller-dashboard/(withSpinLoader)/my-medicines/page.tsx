import { Pill } from "lucide-react";

import MyMedicinesTable from "@/components/modules/dashboard/seller/MyMedicinesTable";
import { sellerService } from "@/services/seller.service";

const MyMedicinesPage = async () => {
  const { data: medicines } = await sellerService.myMedicines();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Pill className="size-5" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            My Medicines
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse, search and manage all the medicines you have listed.
          </p>
        </div>
      </div>

      <MyMedicinesTable medicines={medicines ?? []} />
    </div>
  );
};

export default MyMedicinesPage;

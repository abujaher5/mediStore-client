import { ArrowRight, Pill } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MedicineCard } from "@/components/modules/shop/MedicineCard";
import { medicineService } from "@/services/medicine.service";
import type { Medicine } from "@/types";

const FeaturedMedicines = async () => {
  let medicines: Medicine[] = [];

  try {
    const result = await medicineService.getAllMedicines({
      page: 1,
      limit: 8,
    });
    medicines = result?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch featured medicines", error);
  }

  if (!medicines.length) return null;

  return (
    <section className="w-full max-w-full overflow-hidden px-4 py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
            <p className="mb-2 text-xl font-semibold uppercase tracking-widest text-primary">
              Best Sellers
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Featured Medicines
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Handpicked genuine medicines from trusted brands — ordered by
              customers like you every day.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/shop">
              View All
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button asChild className="rounded-full px-8">
            <Link href="/shop">
              <Pill className="size-4" />
              Explore All Medicines
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedicines;

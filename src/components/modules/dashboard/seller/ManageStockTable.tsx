"use client";

import {
  Boxes,
  PackageCheck,
  PackageX,
  Pencil,
  Search,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { medicineService } from "@/services/medicine.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Medicine } from "@/types";
import { cn } from "@/lib/utils";

import UpdateStockModal from "./UpdateStockModal";

const LOW_STOCK_THRESHOLD = 10;

type StockFilter = "all" | "low" | "out";

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return { label: "Out of Stock", variant: "destructive" as const };
  }
  if (stock < LOW_STOCK_THRESHOLD) {
    return { label: "Low Stock", variant: "destructive-outline" as const };
  }
  return { label: "In Stock", variant: "success" as const };
};

const ManageStockTable = ({ data }: { data?: Medicine[] }) => {
  const router = useRouter();
  const medicines = useMemo(() => data ?? [], [data]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StockFilter>("all");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleOpenModal = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setOpen(true);
  };

  const handleUpdateStock = async (
    id: string,
    stock: number,
  ): Promise<boolean> => {
    const toastId = toast.loading("Updating stock...");

    try {
      await medicineService.updateStock(id, stock);
      toast.success("Stock updated successfully.", { id: toastId });
      router.refresh();
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update stock, please try again..",
        { id: toastId },
      );
      return false;
    }
  };

  const stats = useMemo(() => {
    const totalUnits = medicines.reduce((sum, m) => sum + m.stock, 0);
    const lowStock = medicines.filter(
      (m) => m.stock > 0 && m.stock < LOW_STOCK_THRESHOLD,
    ).length;
    const outOfStock = medicines.filter((m) => m.stock === 0).length;

    return { totalUnits, lowStock, outOfStock };
  }, [medicines]);

  const filteredMedicines = useMemo(() => {
    const query = search.trim().toLowerCase();

    return medicines.filter((medicine) => {
      if (filter === "low" && !(medicine.stock > 0 && medicine.stock < LOW_STOCK_THRESHOLD)) {
        return false;
      }
      if (filter === "out" && medicine.stock !== 0) {
        return false;
      }

      if (!query) return true;

      return (
        medicine.name.toLowerCase().includes(query) ||
        medicine.manufacturer.toLowerCase().includes(query) ||
        (medicine.category?.name ?? "").toLowerCase().includes(query)
      );
    });
  }, [medicines, search, filter]);

  const statCards = [
    {
      label: "Total Units in Stock",
      value: stats.totalUnits.toLocaleString(),
      icon: Boxes,
      iconClassName: "text-primary bg-primary/10",
    },
    {
      label: "Well Stocked",
      value: medicines.length - stats.lowStock - stats.outOfStock,
      icon: PackageCheck,
      iconClassName: "text-green-600 bg-green-500/10",
    },
    {
      label: "Low Stock",
      value: stats.lowStock,
      icon: TriangleAlert,
      iconClassName: "text-yellow-600 bg-yellow-500/10",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock,
      icon: PackageX,
      iconClassName: "text-destructive bg-destructive/10",
    },
  ];

  const filterOptions: { value: StockFilter; label: string; count: number }[] = [
    { value: "all", label: "All", count: medicines.length },
    { value: "low", label: "Low Stock", count: stats.lowStock },
    { value: "out", label: "Out of Stock", count: stats.outOfStock },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="gap-2 py-4">
            <CardContent className="flex items-center gap-3 px-4">
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.iconClassName}`}
              >
                <stat.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-none tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, manufacturer or category..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border p-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                filter === option.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "rounded-full px-1.5 tabular-nums",
                  filter === option.value
                    ? "bg-primary-foreground/20"
                    : "bg-muted",
                )}
              >
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14 text-center">#</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines?.length ? (
              filteredMedicines.map((medicine, index) => {
                const stockStatus = getStockStatus(medicine.stock);
                const stockPercent = Math.min(
                  100,
                  (medicine.stock / (LOW_STOCK_THRESHOLD * 3)) * 100,
                );

                return (
                  <TableRow key={medicine.id}>
                    <TableCell className="text-center text-muted-foreground tabular-nums">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={medicine.imageUrl}
                            alt={medicine.name}
                            className="size-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            onLoad={(e) => {
                              e.currentTarget.style.display = "block";
                            }}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {medicine.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {medicine.manufacturer}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {medicine.category ? (
                        <Badge variant="outline">{medicine.category.name}</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="min-w-44">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium tabular-nums">
                            {medicine.stock}
                          </span>
                          <Badge variant={stockStatus.variant}>
                            {stockStatus.label}
                          </Badge>
                        </div>
                        <div className="h-1.5 w-full max-w-32 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              medicine.stock === 0
                                ? "bg-destructive"
                                : medicine.stock < LOW_STOCK_THRESHOLD
                                  ? "bg-yellow-500"
                                  : "bg-green-500",
                            )}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(medicine)}
                      >
                        <Pencil />
                        Update Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-28 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Boxes className="size-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {medicines.length
                        ? "No medicines match your search or filter."
                        : "You haven't listed any medicines yet."}
                    </p>
                    {!medicines.length && (
                      <Button asChild variant="outline" size="sm">
                        <Link href="/seller-dashboard/add-medicine">
                          Add your first medicine
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {medicines.length > 0 && (search || filter !== "all") && (
        <p className="text-xs text-muted-foreground">
          Showing {filteredMedicines.length} of {medicines.length} medicines.
        </p>
      )}

      <UpdateStockModal
        open={open}
        onOpenChange={setOpen}
        medicine={selectedMedicine}
        onSubmit={handleUpdateStock}
      />
    </div>
  );
};

export default ManageStockTable;

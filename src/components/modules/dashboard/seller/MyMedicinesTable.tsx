"use client";

import {
  CircleDollarSign,
  PackageX,
  Pill,
  Plus,
  Search,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Medicine } from "@/types";

import MedicineActions from "./MedicineActions";

const LOW_STOCK_THRESHOLD = 10;

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return { label: "Out of Stock", variant: "destructive" as const };
  }
  if (stock < LOW_STOCK_THRESHOLD) {
    return { label: "Low Stock", variant: "destructive-outline" as const };
  }
  return { label: "In Stock", variant: "success" as const };
};

const MyMedicinesTable = ({ medicines }: { medicines: Medicine[] }) => {
  const [search, setSearch] = useState("");

  const filteredMedicines = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return medicines;

    return medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query) ||
        medicine.manufacturer.toLowerCase().includes(query) ||
        (medicine.category?.name ?? "").toLowerCase().includes(query),
    );
  }, [medicines, search]);

  const stats = useMemo(() => {
    const totalValue = medicines.reduce(
      (sum, medicine) => sum + medicine.price * medicine.stock,
      0,
    );
    const lowStock = medicines.filter(
      (medicine) =>
        medicine.stock > 0 && medicine.stock < LOW_STOCK_THRESHOLD,
    ).length;
    const outOfStock = medicines.filter(
      (medicine) => medicine.stock === 0,
    ).length;

    return { totalValue, lowStock, outOfStock };
  }, [medicines]);

  const statCards = [
    {
      label: "Total Listings",
      value: medicines.length,
      icon: Pill,
      iconClassName: "text-primary bg-primary/10",
    },
    {
      label: "Inventory Value",
      value: `$${stats.totalValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: CircleDollarSign,
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

        <Button asChild size="sm">
          <Link href="/seller-dashboard/add-medicine">
            <Plus />
            Add Medicine
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14 text-center">#</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="hidden lg:table-cell">Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines?.length ? (
              filteredMedicines.map((medicine, index) => {
                const stockStatus = getStockStatus(medicine.stock);

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
                    <TableCell className="tabular-nums">
                      ${medicine.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums">{medicine.stock}</span>
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {medicine.createdAt
                        ? new Date(medicine.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <MedicineActions medicine={medicine} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-28 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Pill className="size-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {search
                        ? `No medicines match "${search}".`
                        : "You haven't listed any medicines yet."}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/seller-dashboard/add-medicine">
                        <Plus />
                        Add your first medicine
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {medicines.length > 0 && search && (
        <p className="text-xs text-muted-foreground">
          Showing {filteredMedicines.length} of {medicines.length} medicines.
        </p>
      )}
    </div>
  );
};

export default MyMedicinesTable;

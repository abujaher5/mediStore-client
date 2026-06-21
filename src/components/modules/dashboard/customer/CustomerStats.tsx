"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Wallet,
  Star,
  Truck,
  BadgeCheck,
} from "lucide-react";

interface CustomerStatsProps {
  stats: {
    totalOrders: number;
    confirmedOrders: number;
    pendingOrders: number;
    completedOrders: number;
    shippedOrders: number;
    totalSpent: number;
    reviewsGiven: number;
  };
}

const statCards = (stats: CustomerStatsProps["stats"]) => [
  {
    label: "Total Orders",
    value: stats?.totalOrders,
    icon: ShoppingBag,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    label: "Confirmed Orders",
    value: stats?.confirmedOrders,
    icon: BadgeCheck,
    accent: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Pending Orders",
    value: stats?.pendingOrders,
    icon: Clock3,
    accent: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    label: "Completed Orders",
    value: stats?.completedOrders,
    icon: CheckCircle2,
    accent: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    label: "Shipped Orders",
    value: stats?.shippedOrders,
    icon: Truck,
    accent: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },

  {
    label: "Total Spent",
    value: `৳ ${stats?.totalSpent}`,
    icon: Wallet,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Reviews Given",
    value: stats?.reviewsGiven,
    icon: Star,
    accent: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

export default function CustomerDashboardStats({ stats }: CustomerStatsProps) {
  const cards = statCards(stats);
  console.log(stats);

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, accent, bg, border }) => (
        <Card
          key={label}
          className={`relative overflow-hidden border ${border} bg-card shadow-sm hover:shadow-md transition-all duration-300`}
        >
          {/* Background glow */}
          <div
            className={`absolute top-0 right-0 w-20 h-20 rounded-full ${bg} blur-2xl -translate-y-6 translate-x-6 pointer-events-none`}
          />

          <CardContent className="pt-5 pb-5 px-5 space-y-3">
            {/* Icon */}
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`w-4 h-4 ${accent}`} />
              </div>
            </div>

            {/* Stats */}
            <div>
              <p className={`text-3xl font-bold tracking-tight ${accent}`}>
                {value}
              </p>

              <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

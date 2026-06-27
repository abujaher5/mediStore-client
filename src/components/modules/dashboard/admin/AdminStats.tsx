import { Card, CardContent } from "@/components/ui/card";

import { Pill, ShoppingCart, User } from "lucide-react";

interface AdminStatsProps {
  stats: {
    totalMedicines: number;
    totalUsers: number;
    totalSellers: number;
    totalCustomers: number;
    totalOrders: number;
  };
}

const statCards = (stats: AdminStatsProps["stats"]) => [
  {
    label: "Total Medicines",
    value: stats?.totalMedicines,
    icon: Pill,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Total Users",
    value: stats?.totalUsers,
    icon: User,
    accent: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    label: "Total Sellers",
    value: stats?.totalSellers,
    icon: User,
    accent: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    label: "Total Customers",
    value: stats?.totalCustomers,
    icon: User,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    label: "Total Orders",
    value: stats?.totalOrders,
    icon: ShoppingCart,
    accent: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

export default function AdminDashboardStats({ stats }: AdminStatsProps) {
  const cards = statCards(stats);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map(({ label, value, icon: Icon, accent, bg, border }) => (
        <Card
          key={label}
          className={`relative overflow-hidden border ${border} bg-card shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          {/* Subtle corner glow */}
          <div
            className={`absolute top-0 right-0 w-20 h-20 rounded-full ${bg} blur-2xl -translate-y-6 translate-x-6 pointer-events-none`}
          />

          <CardContent className="pt-5 pb-5 px-5 space-y-3">
            {/* Icon + badge row */}
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`w-4 h-4 ${accent}`} />
              </div>
            </div>

            {/* Value */}
            <div>
              <p className={`text-3xl font-bold tracking-tight ${accent}`}>
                {value?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pill,
  Package,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface SellerStatsProps {
  stats: {
    totalMedicines: number;
    totalStock: number;
    lowStockMedicines: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

const statCards = (stats: SellerStatsProps["stats"]) => [
  {
    label: "Total Medicines",
    value: stats?.totalMedicines,
    icon: Pill,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    suffix: null,
  },
  {
    label: "Total Stock",
    value: stats?.totalStock,
    icon: Package,
    accent: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    suffix: "units",
  },
  {
    label: "Low Stock",
    value: stats?.lowStockMedicines,
    icon: AlertTriangle,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    badge: "Needs Attention",
    suffix: null,
  },
  {
    label: "Total Orders",
    value: stats?.totalOrders,
    icon: ShoppingCart,
    accent: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    suffix: null,
  },
  {
    label: "Revenue",
    value: stats?.totalRevenue,
    icon: TrendingUp,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    prefix: "$",
    suffix: null,
  },
];

export default function SellerDashboardStats({ stats }: SellerStatsProps) {
  const cards = statCards(stats);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map(
        ({
          label,
          value,
          icon: Icon,
          accent,
          bg,
          border,
          badge,
          prefix,
          suffix,
        }) => (
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
                {badge && (
                  <Badge
                    variant="destructive"
                    className="text-[10px] px-1.5 py-0 font-medium"
                  >
                    {badge}
                  </Badge>
                )}
              </div>

              {/* Value */}
              <div>
                <p className={`text-3xl font-bold tracking-tight ${accent}`}>
                  {prefix ?? ""}
                  {value?.toLocaleString()}
                  {suffix ? (
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {suffix}
                    </span>
                  ) : null}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}

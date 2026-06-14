import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SellerStatsProps {
  stats: {
    totalMedicines: number;
    totalStock: number;
    lowStockMedicines: number;
    totalOrders: number;
    revenue: number;
  };
}

export default function SellerDashboardStats({ stats }: SellerStatsProps) {
  console.log(stats);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader>
          <CardTitle>Total Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalMedicines}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalStock}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Low Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-red-500">
            {stats?.lowStockMedicines}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats?.totalOrders}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold"> {stats?.revenue}</p>
        </CardContent>
      </Card>
    </div>
  );
}

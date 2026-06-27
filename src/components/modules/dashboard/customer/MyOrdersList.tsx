"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusColor } from "@/lib/orderStatus";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  medicine: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

export default function MyOrdersList({ orders }: { orders: Order[] }) {
  if (!orders?.length) {
    return (
      <div className="text-center mt-10 text-gray-500">No orders found</div>
    );
  }

  return (
    <div className="grid gap-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg">
                Order #{order.id.slice(0, 8)}
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <Badge className={getOrderStatusColor(order.status)}>
              {order.status}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <Image
                    src={item.medicine.imageUrl}
                    alt={item.medicine.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.medicine.name}</p>

                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p>৳ {item.price}</p>
                    <p className="text-sm text-muted-foreground">
                      Subtotal: ৳ {item.subtotal}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-3 font-semibold">
                <span>Total</span>
                <span>৳ {order.totalAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

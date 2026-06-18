"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { getOrderStatusColor } from "@/lib/orderStatus";

interface OrderItem {
  id: string;
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
  createdAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  items: OrderItem[];
}

export default function SellerOrdersTable({ orders }: { orders: Order[] }) {
  if (!orders?.length) {
    return <p>No orders found</p>;
  }

  return (
    <Table>
      <TableCaption>Orders placed for your medicines</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Medicine</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) =>
          order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{order.customer.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {order.customer.email}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.medicine.imageUrl}
                    alt={item.medicine.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />

                  <span>{item.medicine.name}</span>
                </div>
              </TableCell>

              <TableCell>{item.quantity}</TableCell>

              <TableCell>৳ {item.price}</TableCell>

              <TableCell>৳ {item.subtotal}</TableCell>

              <TableCell>
                <Badge className={getOrderStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}

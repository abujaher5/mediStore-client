"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusColor } from "@/lib/orderStatus";

interface Order {
  id: string;
  status: string;
  customer: {
    name: string;
    email: string;
  };
}

export default function ManageOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id.slice(0, 8)}</TableCell>

            <TableCell>
              <div>
                <p>{order.customer.name}</p>
                <p className="text-sm text-gray-500">{order.customer.email}</p>
              </div>
            </TableCell>

            <TableCell>
              <Badge className={getOrderStatusColor(order.status)}>
                {order.status}
              </Badge>
            </TableCell>

            <TableCell>
              <UpdateOrderStatusModal order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { PageHeader } from "../_components/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./_components/OrderActions";
import StatusPill from "@/components/shared/components/StatusPill";

function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      totalPriceInCents: true,
      status: true,
      trxref: true,
      user: { select: { email: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default function OrdersPage() {
  return (
    <>
      <PageHeader>Sales</PageHeader>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const orders = await getOrders();

  if (orders.length === 0) return <p>No sales found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Staus</TableHead>
          <TableHead>Price Paid</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">
                {order.user.firstName} {order.user.lastName}
              </div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {order.user.email}
              </div>
            </TableCell>
            <TableCell>
              <StatusPill status={order.status} />
            </TableCell>
            <TableCell>
              {formatCurrency(order.totalPriceInCents / 100)}
            </TableCell>
            <TableCell>{order.trxref}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

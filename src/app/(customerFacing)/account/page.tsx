import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AccessDenied from "@/components/shared/AccessDenied";
import { getUserOrders } from "@/app/admin/_actions/order.actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusPill from "@/components/shared/components/StatusPill";

import { formatCurrency } from "@/lib/formatters";
import { PaginationComponent } from "@/components/shared/Pagination";

const AccountPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { status, orderDetails, totalPages } = await getUserOrders({
    page: parseInt(searchParams.page),
  });

  if (status !== 200) return <AccessDenied />;
  return (
    <section className="page-container space-y-12">
      <div className="mx-auto w-fit">
        <h1 className="py-3 text-center font-montserrat text-3xl font-bold">
          Welcome,
        </h1>
        <p>View and manage your orders and account details.</p>
      </div>

      <div>
        <Table className="justify-between rounded-xl border">
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    className="underline"
                    href={`checkout/order-success?reference=${order.trxref}`}
                  >
                    <div className="flex items-center gap-1">
                      {order.trxref}
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  {order.updatedAt.toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}
                </TableCell>
                <TableCell>
                  <StatusPill status={order.status} />
                </TableCell>
                <TableCell>
                  {formatCurrency(order.totalPriceInCents / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages && <PaginationComponent totalPages={totalPages} />}
      </div>
    </section>
  );
};

export default AccountPage;

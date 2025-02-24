import React from "react";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";
import StatusPill from "@/components/shared/components/StatusPill";
import { formatCurrency } from "@/lib/formatters";

interface RecentOrderTableRowProps {
  orderId: string;
  trxref: string;
  createdAt: Date;
  status: string;
  totalPriceInCents: number;
}

const RecentOrderTableRow = ({
  orderId,
  trxref,
  createdAt,
  status,
  totalPriceInCents,
}: RecentOrderTableRowProps) => {
  return (
    <>
      <TableRow key={orderId}>
        <TableCell>
          <Link
            className="underline"
            href={`/checkout/order-success?reference=${trxref}`}
          >
            <div className="flex items-center gap-1">
              {trxref}
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        </TableCell>
        <TableCell className="max-sm:hidden">
          {createdAt.toLocaleString("en-US", {
            dateStyle: "medium",
          })}
        </TableCell>
        <TableCell>
          <StatusPill status={status} />
        </TableCell>
        <TableCell>{formatCurrency(totalPriceInCents / 100)}</TableCell>
      </TableRow>
    </>
  );
};

export default RecentOrderTableRow;

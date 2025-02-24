import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginationComponent } from "@/components/shared/Pagination";

import NoOrdersFoundCard from "@/features/account/components/not-found/NoOrdersFoundCard";
import RecentOrderTableRow from "@/features/account/components/recent-orders/RecentOrderTableRow";

import { getUserOrders } from "@/server/actions/order.actions";

const AccountPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { status, orderDetails, totalPages } = await getUserOrders({
    page: parseInt(searchParams.page),
  });

  if (status !== 200) return <NoOrdersFoundCard />;
  return (
    <section>
      {orderDetails && orderDetails.length > 0 ? (
        <div>
          <h4 className="mb-2 font-bold">Your recent orders: </h4>
          <Table className="justify-between rounded-xl border">
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead className="max-sm:hidden">Ordered at</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails?.map((order) => (
                <RecentOrderTableRow
                  key={order.id}
                  status={order.status}
                  orderId={order.id}
                  trxref={order.trxref}
                  createdAt={order.createdAt}
                  totalPriceInCents={order.totalPriceInCents}
                />
              ))}
            </TableBody>
          </Table>
          {totalPages && <PaginationComponent totalPages={totalPages} />}
        </div>
      ) : (
        <NoOrdersFoundCard />
      )}
    </section>
  );
};

export default AccountPage;

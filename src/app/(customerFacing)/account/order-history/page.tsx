import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaginationComponent } from "@/components/shared/Pagination";

import AccessDenied from "@/components/shared/AccessDenied";
import NoOrdersFoundCard from "@/components/account/NoOrdersFoundCard";
import RecentOrderTableRow from "@/components/account/RecentOrderTableRow";

import { getUserOrders } from "@/utils/actions/order.actions";

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
    <section>
      {orderDetails && orderDetails.length > 0 ? (
        <div>
          <h4 className="mb-2 font-bold">Your recent orders: </h4>
          <Table className="justify-between rounded-xl border">
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead className="max-sm:hidden">Date</TableHead>
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
                  updatedAt={order.updatedAt}
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

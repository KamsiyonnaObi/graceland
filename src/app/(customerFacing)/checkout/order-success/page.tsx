import { notFound } from "next/navigation";

import { CircleCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { CartSummaryItem } from "@/components/Cart/CartDetails";

import { formatCurrency } from "@/lib/formatters";
import { getOrderByTrxref } from "@/app/admin/_actions/order.actions";

const OrderSuccessPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const trxref = searchParams.reference as string;

  const orderData = await getOrderByTrxref(trxref);

  if (!orderData) {
    return notFound();
  }
  return (
    <div className="page-container">
      <section className="flex w-full gap-5">
        <div className="flex w-3/5 flex-col space-y-4">
          <div className="flex items-center gap-5">
            <CircleCheck className="h-12 w-12 stroke-secondary-two" />
            <div>
              <h1 className="text-2xl font-bold">Order Confirmed #{trxref}</h1>
              <p>Thank you for your purchase! Your order has been confirmed.</p>
            </div>
          </div>
        </div>

        <div className="sticky top-4 mb-[275px] h-fit w-2/5 self-start">
          <Card className="max-w-[375px]">
            <CardHeader className="rounded-t-lg bg-muted/50 py-3">
              <div className="flex justify-between">
                <CardTitle>Order Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                {orderData.orderItems?.map((item) => (
                  <CartSummaryItem
                    key={item.id}
                    name={item.product.name}
                    quantity={item.quantity}
                    price={item.product.priceInCents}
                  />
                ))}
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {orderData.shippingFeeInCents === 0
                        ? "FREE"
                        : formatCurrency(orderData.shippingFeeInCents / 100)}
                    </span>
                  </li>
                  {orderData.taxesPaid && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">VAT (7.5%)</span>
                      <span>{formatCurrency(orderData.taxesPaid / 100)}</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>{formatCurrency(orderData.totalPriceInCents / 100)}</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccessPage;

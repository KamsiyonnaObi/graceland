import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CartSummaryItem } from "@/features/cart/components/CartDetails";

import { formatCurrency } from "@/lib/formatters";
import { orderStatus } from "@prisma/client";
import { Info } from "lucide-react";

type OrderItems = {
  id: string;
  quantity: number;
  priceInCents: number;
  product: { name: string };
};

interface PurchasedOrderSummary {
  fulfilmentType: "PICKUP" | "SHIPPING";
  shippingFeeInCents: number;
  taxesPaid: number | null;
  totalPriceInCents: number;
  orderItems: OrderItems[];
  orderStatus: orderStatus;
}

const PurchasedOrderSummary = ({
  shippingFeeInCents,
  totalPriceInCents,
  fulfilmentType,
  taxesPaid,
  orderItems,
  orderStatus,
}: PurchasedOrderSummary) => {
  const isShipping = fulfilmentType === "SHIPPING";
  const isShippingFeeAssigned =
    shippingFeeInCents !== null && shippingFeeInCents > 0;
  const isOrderCompleted = orderStatus === "DELIVERED";
  return (
    <Card className="w-full shadow-none">
      <CardHeader className="rounded-t-lg bg-muted/50 py-3 max-lg:hidden">
        <div className="flex justify-between">
          <CardTitle>Order Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          {orderItems?.map((item) => (
            <CartSummaryItem
              key={item.id}
              name={item.product.name}
              quantity={item.quantity}
              price={item.priceInCents}
            />
          ))}
          <Separator className="my-2" />
          <ul className="grid gap-3">
            {isShipping && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {isShippingFeeAssigned
                    ? formatCurrency(shippingFeeInCents! / 100)
                    : "TBD"}
                </span>
              </li>
            )}
            {taxesPaid && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">VAT (7.5%)</span>
                <span>{formatCurrency(taxesPaid / 100)}</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between font-semibold">
          <span className="text-muted-foreground">Total</span>
          <span>{formatCurrency(totalPriceInCents / 100)}</span>
        </div>

        {isShipping && !isOrderCompleted && (
          <Alert
            className="w-fill flex items-center gap-3 border-none p-2"
            variant="destructive"
          >
            <AlertTitle>
              <Info size={16} />
            </AlertTitle>
            <AlertDescription className="text-xs">
              {isShippingFeeAssigned ? (
                <i>Shipping fee will be paid on delivery.</i>
              ) : (
                <i>Shipping fee will be added and paid on delivery. Fee TBD.</i>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default PurchasedOrderSummary;

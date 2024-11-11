import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { CartSummaryItem } from "@/components/cart/CartDetails";

import { formatCurrency } from "@/lib/formatters";

type OrderItems = {
  id: string;
  quantity: number;
  priceInCents: number;
  product: { name: string };
};

interface PurchasedOrderSummary {
  shippingFeeInCents: number;
  taxesPaid: number | null;
  totalPriceInCents: number;
  orderItems: OrderItems[];
}

const PurchasedOrderSummary = ({
  shippingFeeInCents,
  taxesPaid,
  totalPriceInCents,
  orderItems,
}: PurchasedOrderSummary) => {
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
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {shippingFeeInCents === 0
                  ? "FREE"
                  : formatCurrency(shippingFeeInCents / 100)}
              </span>
            </li>
            {taxesPaid && (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">VAT (7.5%)</span>
                <span>{formatCurrency(taxesPaid / 100)}</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between font-semibold">
          <span className="text-muted-foreground">Total</span>
          <span>{formatCurrency(totalPriceInCents / 100)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PurchasedOrderSummary;

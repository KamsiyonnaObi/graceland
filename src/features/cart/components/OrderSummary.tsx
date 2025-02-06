"use client";
import Link from "next/link";

import { Info, ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useCartStore } from "@/store/useCartStore";

import { CartSummaryItem, TaxAndShippingSummary } from "./CartDetails";
import { formatCurrency } from "@/lib/formatters";

type OrderSummaryProps = {
  isCheckout?: boolean;
};

const OrderSummary = ({ isCheckout }: OrderSummaryProps) => {
  const { shippingFee, cartItems, totalPrice, isPickUp } = useCartStore();
  return (
    <Card className="w-full shadow-none max-lg:p-4">
      <CardHeader className="rounded-t-lg bg-muted/50 py-3 max-lg:hidden">
        <div className="flex justify-between">
          <CardTitle>Order Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm max-lg:p-0">
        <div className="grid gap-3">
          {cartItems?.map((item) => (
            <CartSummaryItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(totalPrice / 100)}</span>
            </li>
            {isCheckout ? (
              <TaxAndShippingSummary
                isPickUp={isPickUp}
                subtotal={totalPrice}
                shipping={shippingFee}
              />
            ) : (
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>-</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 max-lg:px-0 max-lg:pt-6">
        {!isCheckout && (
          <Button
            asChild
            size="lg"
            className="w-full rounded-xl bg-secondary-one font-semibold text-black hover:bg-secondary-two"
          >
            <Link className="flex w-full items-center" href="/checkout">
              <ShieldCheck className="mr-2 h-5 w-5" /> Continue to Checkout
            </Link>
          </Button>
        )}
        {!isPickUp && (
          <div className="w-fill flex items-center gap-3">
            <Info size={28} />
            <i className="text-xs">
              Shipping fees are paid on delivery. Your fees will be calculated
              when order is shipped.
            </i>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;

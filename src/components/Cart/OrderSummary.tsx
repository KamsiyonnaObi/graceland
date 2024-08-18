"use client";
import Link from "next/link";

import { ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { CartItem, useCartStore } from "@/store/useCartStore";

import { CartSummaryItem, TaxAndShippingSummary } from "./CartDetails";
import { formatCurrency } from "@/lib/formatters";

type OrderSummaryProps = {
  totalPrice: number;
  cartItems: CartItem[];
  isCheckout?: boolean;
};

const OrderSummary = ({
  totalPrice,
  cartItems,
  isCheckout,
}: OrderSummaryProps) => {
  const { shippingFee } = useCartStore();
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
      {!isCheckout && (
        <CardFooter className="max-lg:px-0 max-lg:pt-6">
          <Button
            asChild
            size="lg"
            className="w-full rounded-xl bg-secondary-one font-semibold text-black hover:bg-secondary-two"
          >
            <Link className="flex w-full items-center" href="/checkout">
              <ShieldCheck className="mr-2 h-5 w-5" /> Continue to Checkout
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderSummary;

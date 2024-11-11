"use client";

import { CreditCard } from "lucide-react";
import { useEffect, useMemo } from "react";

import { formatCurrency } from "@/lib/formatters";
import { useCartStore } from "@/store/useCartStore";
import { calculateTotals } from "@/utils/checkoutHelpers";

// For Each Item In Cart
export const CartSummaryItem = ({
  name,
  quantity,
  price,
}: {
  name: string;
  quantity: number;
  price: number;
}) => (
  <li className="flex items-center justify-between">
    <span className="text-muted-foreground">
      {name} x <span>{quantity}</span>
    </span>
    <span>{formatCurrency((price * quantity) / 100)}</span>
  </li>
);

// Summary of taxes and shipping costs
export const TaxAndShippingSummary = ({
  subtotal,
  shipping = 0,
}: {
  subtotal: number;
  shipping?: number;
}) => {
  const { setTotalPriceWithFees } = useCartStore();
  // Use useMemo to memoize the computed values
  const { tax, total } = useMemo(
    () => calculateTotals(subtotal, shipping),
    [subtotal, shipping],
  );

  // useEffect to set the total price with fees in the store
  useEffect(() => {
    setTotalPriceWithFees(total);
  }, [total, setTotalPriceWithFees]);
  return (
    <ul className="grid gap-3">
      <>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shipping === 0 ? "FREE" : formatCurrency(shipping / 100)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">VAT (7.5%)</span>
          <span>{formatCurrency(tax / 100)}</span>
        </li>
      </>

      <li className="flex items-center justify-between font-semibold">
        <span className="text-muted-foreground">Total</span>
        <span>{formatCurrency(total / 100)}</span>
      </li>
    </ul>
  );
};

// Address Component
export const Address = ({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) => (
  <div className="grid gap-3">
    <div className="font-semibold">{title}</div>
    <address className="grid gap-0.5 not-italic text-muted-foreground">
      {lines.map((line, index) => (
        <span key={index}>{line}</span>
      ))}
    </address>
  </div>
);

// Customer Information Component
export const CustomerInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between">
    <dt className="text-muted-foreground">{label}</dt>
    <dd>{value}</dd>
  </div>
);

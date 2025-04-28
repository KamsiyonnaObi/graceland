"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityButtonProps {
  qty: number;
  toggleCartQuantity: (action: "inc" | "dec") => void;
}

const QuantityButton = ({ qty, toggleCartQuantity }: QuantityButtonProps) => {
  return (
    <div>
      <p className="mb-4 text-sm">
        <strong>Quantity</strong>: {qty}
      </p>
      <div className="mb-4 flex w-fit items-center gap-2 rounded-full bg-primary-one px-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => toggleCartQuantity("dec")}
          disabled={qty <= 1}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <span className="min-w-5 text-center text-sm font-medium">{qty}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => toggleCartQuantity("inc")}
          disabled={qty >= 10}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default QuantityButton;

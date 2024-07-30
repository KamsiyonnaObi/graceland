"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

type AddToCartProps = {
  productId: string;
  productName: string;
  price: number;
  imagePath: string;
};

const AddToCart = ({
  productId,
  productName,
  price,
  imagePath,
}: AddToCartProps) => {
  const { qty, onAddCartItem, incQty, decQty } = useCartStore();

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex items-center rounded border px-2">
        <Button
          variant="ghost"
          className="px-2 py-1"
          onClick={decQty}
          disabled={qty <= 1}
        >
          -
        </Button>
        <span className="w-auto px-4">{qty}</span>
        <Button
          variant="ghost"
          className="px-2 py-1"
          onClick={incQty}
          disabled={qty >= 10}
        >
          +
        </Button>
      </div>
      <div className="flex w-full gap-3">
        <Button
          onClick={() =>
            onAddCartItem(
              {
                id: productId,
                name: productName,
                quantity: 1,
                price,
                imagePath,
              },
              qty,
            )
          }
        >
          Add To Cart{" "}
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

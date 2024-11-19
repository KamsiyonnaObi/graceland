"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import AddToCartToast from "@/components/toasts/AddToCartToast";

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

  // Cart item preparation
  const prepareCartItem = () => ({
    id: productId,
    name: productName,
    quantity: qty,
    price,
    imagePath,
  });

  // Handle Add to Cart
  const handleAddToCart = () => {
    try {
      const cartItem = prepareCartItem();
      onAddCartItem(cartItem, qty);
      showSuccessToast(productName, price, imagePath);
    } catch (error) {
      showErrorToast();
    }
  };

  // Toast notifications
  const showSuccessToast = (name: string, price: number, image: string) => {
    toast.success(
      <AddToCartToast productName={name} price={price} imagePath={image} />,
      {
        position: "bottom-right",
        closeButton: true,
      },
    );
  };

  const showErrorToast = () => {
    toast.error("Failed to add item to cart", {
      position: "bottom-right",
    });
  };

  return (
    <div className="flex w-full flex-col items-start gap-4">
      {/* Quantity controls */}
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

      {/* Add to Cart button */}
      <div className="flex w-full gap-3">
        <Button onClick={handleAddToCart} disabled={qty < 1}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

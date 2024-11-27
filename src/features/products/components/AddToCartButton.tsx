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
      onAddCartItem(cartItem, 1);
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
      },
    );
  };

  const showErrorToast = () => {
    toast.error("Failed to add item to cart", {
      position: "bottom-right",
      closeButton: true,
    });
  };

  return (
    <div className="">
      <div className="w-full">
        <Button
          className="w-full rounded font-bold"
          size="lg"
          onClick={handleAddToCart}
          disabled={qty < 1}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

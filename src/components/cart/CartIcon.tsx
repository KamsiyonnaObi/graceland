"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

const CartIcon = () => {
  const { cartItems } = useCartStore();

  return (
    <>
      <div className="relative flex">
        <ShoppingCart />
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-tertiary-one px-1 text-xs font-bold text-black">
          {cartItems?.length > 0 ? cartItems?.length : ""}
        </div>
      </div>
    </>
  );
};

export default CartIcon;

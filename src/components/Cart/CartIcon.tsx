"use client";


import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

const CartIcon = () => {
  const {cartItems}  = useCartStore();

  return (
    <>
      <div className="flex relative">    
            <ShoppingCart />
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2  text-black bg-tertiary-one text-xs rounded-full px-1"> {cartItems?.length > 0 ? cartItems?.length : ""}</div>
            </div>
    </>
  )

}

export default CartIcon
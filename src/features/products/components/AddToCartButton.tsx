"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";


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
  const router = useRouter();
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
          onClick={() => {
          try {
            onAddCartItem(
              {
                id: productId,
                name: productName,
                quantity: 1,
                price,
                imagePath,
              },
              qty,
            ); 
            toast.success(<div> <Image src={imagePath}  width={80}   
              alt="rating star"
              height={80}/></div>, {
              position: 'bottom-right',
              closeButton : true,
              action: {
                label: 'Go to Cart',
                onClick: () =>  router.push("/cart"),
              },
            });
          } catch (error){
            toast.error("Failed to add item to cart");
          }
        }
          }
        >
          Add To Cart{" "}
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

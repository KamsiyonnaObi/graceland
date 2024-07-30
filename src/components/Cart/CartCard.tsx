"use client";
import Image from "next/image";

import { Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/formatters";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";

const CartCard = ({
  id,
  name,
  qty,
  price,
  imagePath,
}: {
  id: string;
  name: string;
  qty: number;
  price: number;
  imagePath: string;
}) => {
  const { onRemoveCartItem, toggleCartItemQuantity } = useCartStore();
  return (
    <Card>
      <section className="flex w-full pl-6 pt-6">
        <div className="relative w-[145px]">
          <Image src={imagePath} alt={name} className="object-contain" fill />
        </div>
        <div className="w-full">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{name}</CardTitle>
              <h3 className="px-3 font-bold">
                {formatCurrency((price * qty) / 100)}
              </h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pb-0">
            <p>{formatCurrency(price / 100)} each</p>
            <div className="flex w-fit items-center rounded-full border px-2">
              <Button
                variant="ghost"
                className="px-2 py-1"
                onClick={() => toggleCartItemQuantity(id, "dec")}
                disabled={qty <= 1}
              >
                -
              </Button>
              <span className="w-auto px-4">{qty}</span>
              <Button
                variant="ghost"
                className="px-2 py-1"
                onClick={() => toggleCartItemQuantity(id, "inc")}
                disabled={qty >= 10}
              >
                +
              </Button>
            </div>
          </CardContent>
        </div>
      </section>
      <CardFooter className="flex justify-end gap-3">
        <Button
          className="text-xs"
          size="sm"
          variant={"ghost"}
          onClick={() => onRemoveCartItem(id)}
        >
          <Trash2 className="mr-2 h-4 w-4" color="red" /> Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartCard;

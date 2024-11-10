"use client";
import Image from "next/image";

import { Minus, Plus, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatCurrency } from "@/lib/formatters";
import { Button } from "../../../components/ui/button";
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
    <Card className="p-4">
      <section className="flex w-full">
        <div className="relative w-[100px]">
          <Image src={imagePath} alt={name} className="object-contain" fill />
        </div>
        <div className="w-full">
          <CardHeader className="py-0 pr-0">
            <div className="mb-2 flex justify-between">
              <CardTitle className="line-clamp-4 text-sm font-normal">
                {name}
              </CardTitle>
              <h3 className="font-bold">
                {formatCurrency((price * qty) / 100)}
              </h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pb-0">
            <div className="flex w-fit items-center rounded-full">
              <Button
                variant="default"
                size="icon"
                className="h-5 w-5 rounded-full border"
                onClick={() => toggleCartItemQuantity(id, "dec")}
                disabled={qty <= 1}
              >
                <Minus className="h-2" />
              </Button>
              <span className="w-auto px-4 text-sm font-medium">{qty}</span>
              <Button
                variant="default"
                size="icon"
                className="h-5 w-5 rounded-full border"
                onClick={() => toggleCartItemQuantity(id, "inc")}
                disabled={qty >= 10}
              >
                <Plus className="h-2" />
              </Button>
            </div>
            <Button
              className="p-0 text-xs"
              size="sm"
              variant="ghost"
              onClick={() => onRemoveCartItem(id)}
            >
              <Trash2 className="mr-2 h-4 w-4" color="red" /> Remove
            </Button>
          </CardContent>
        </div>
      </section>
    </Card>
  );
};

export default CartCard;

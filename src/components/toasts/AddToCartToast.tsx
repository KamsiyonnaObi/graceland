"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

type AddToCartToastProps = {
  productName: string;
  price: number;
  imagePath: string;
};

const AddToCartToast = ({
  productName,
  price,
  imagePath,
}: AddToCartToastProps) => {
  const router = useRouter();
  return (
    <div className="flex-center w-full justify-between">
      <div className="w-1/3">
        <Image
          src={imagePath}
          width={80}
          height={80}
          alt={productName}
          className="rounded"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <div className="font-semibold">Added to cart</div>
        <div className="line-clamp-4 text-gray-700">{productName}</div>
        <div className="font-bold text-green-600">
          {formatCurrency(price / 100)}
        </div>
      </div>

      <Button
        onClick={() => {
          router.push("/cart"), toast.dismiss();
        }}
      >
        Go To Cart
      </Button>
    </div>
  );
};

export default AddToCartToast;

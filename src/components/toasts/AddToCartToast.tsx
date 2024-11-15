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
    <div className="flex space-x-4">
      {/* Image container */}

      <div className="flex-shrink-0">
        <Image
          src={imagePath}
          width={80}
          height={80}
          alt="rating star"
          className="rounded"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <div className="font-semibold">Added to cart</div>
        <div className="text-gray-700">{productName}</div>
        <div className="font-bold text-green-600">
          {formatCurrency(price / 100)}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => {
            router.push("/cart"), toast.dismiss();
          }}
        >
          {" "}
          Go To Cart
        </Button>{" "}
      </div>
    </div>
  );
};

export default AddToCartToast;

import Image from "next/image";

import { formatCurrency } from "@/lib/formatters";

interface PurchasedProductsCardProps {
  productId: string;
  imagePath: string;
  productName: string;
  quantity: number;
  priceInCents: number;
}

const PurchasedProductsCard = ({
  productId,
  imagePath,
  productName,
  quantity,
  priceInCents,
}: PurchasedProductsCardProps) => {
  return (
    <div
      key={productId}
      className="flex flex-col space-y-1 lg:flex-row lg:justify-between"
    >
      <div className="flex flex-col items-start lg:flex-row">
        <div className="relative h-[140px] w-[140px] max-lg:mx-auto lg:h-[75px] lg:w-[75px]">
          <Image
            src={imagePath}
            alt={productName}
            className="object-contain"
            fill
          />
        </div>
        <div>
          <p className="font-medium">{productName}</p>
          <p className="text-xs">Quantity: {quantity}</p>
        </div>
      </div>
      <p className="text-lg font-bold">{formatCurrency(priceInCents / 100)}</p>
    </div>
  );
};

export default PurchasedProductsCard;

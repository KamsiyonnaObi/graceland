import Link from "next/link";
import Image from "next/image";

import { formatCurrency } from "@/lib/formatters";

interface ProfileOrderCardProps {
  date: Date;
  totalPricePaid: number;
  totalItems: number;
  productName: string;
  productImgPath: string;
  quantity: number;
  trxref: string;
}

const ProfileOrderCard = ({
  date,
  totalPricePaid,
  totalItems,
  productName,
  productImgPath,
  quantity,
  trxref,
}: ProfileOrderCardProps) => {
  return (
    <div className="border text-sm">
      <div className="flex justify-between p-3">
        <p>
          {date.toLocaleString("en-US", {
            dateStyle: "medium",
          })}
        </p>
        <div className="flex gap-2">
          <p>{`${totalItems} item(s)`}</p>
          <p className="font-bold">{formatCurrency(totalPricePaid / 100)}</p>
        </div>
      </div>
      <div className="flex flex-col px-3 pb-3 sm:flex-row sm:items-center sm:justify-start">
        <div className="relative h-[106px] w-[106px] max-sm:mx-auto">
          <Image
            src={productImgPath}
            alt={productName}
            className="object-contain"
            fill
          />
        </div>
        <div>
          <p className="font-bold">{productName}</p>
          <p className="text-xs">Quantity: {quantity}</p>
        </div>
      </div>
      <div className="flex justify-between border-t p-3">
        <p className="text-sm">
          <span className="font-bold">Order number</span> {trxref}
        </p>
        <Link
          className="text-sm text-blue-700 underline"
          href={`/checkout/order-success?reference=${trxref}`}
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileOrderCard;

import { cn } from "@/lib/utils";
import React from "react";

const statusColors: { [key: string]: string } = {
  pending: "bg-gray-500 text-white",
  confirmed: "bg-yellow-500 text-black",
  processing: "bg-yellow-500 text-black",
  "Verify with Paystack": "bg-orange-500 text-white",
  shipped: "bg-indigo-500 text-white",
  "Out for Delivery": "bg-purple-500 text-white",
  delivered: "bg-green-500 text-white",
  completed: "bg-secondary-one text-black",
  cancelled: "bg-red-500 text-white",
  returned: "bg-pink-500 text-white",
  refunded: "bg-brown-500 text-white",
};

interface StatusPillProps {
  status: string;
}

const StatusPill = ({ status }: StatusPillProps) => {
  const colorClass = statusColors[status] || "bg-gray-500 text-white";
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-sm font-semibold",
        colorClass,
      )}
    >
      {status}
    </span>
  );
};

export default StatusPill;

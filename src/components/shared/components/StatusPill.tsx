import { cn } from "@/lib/utils";
import React from "react";

const statusColors: { [key: string]: string } = {
  CREATED: "bg-primary-two text-black",
  PENDING: "bg-primary-two text-black",
  CONFIRMED: "bg-yellow-500 text-black",
  SHIPPED: "bg-tertiary-one text-black",
  DELIVERED: "bg-secondary-two text-black",
  CANCELLED: "bg-red-500 text-white",
  RETURNED: "bg-pink-500 text-white",
  REFUNDED: "bg-brown-500 text-white",
};

interface StatusPillProps {
  status: string;
}

const StatusPill = ({ status }: StatusPillProps) => {
  const colorClass = statusColors[status] || "bg-gray-500 text-white";

  return (
    <span
      className={cn(
        "inline-block rounded-full px-2 py-1 text-xs font-semibold",
        colorClass,
      )}
    >
      {status.toLowerCase()}
    </span>
  );
};

export default StatusPill;

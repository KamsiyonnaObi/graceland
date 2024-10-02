"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { sortOptions } from "@/constants";
import useQueryString from "@/hooks/products/useQueryString";

export function SortByFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm">Sort by:</p>
      <Select
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="New Arrivals" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.id} value={option.value} id={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { RadioGroupFilters, CheckboxFilters } from "./_components/FilterItems";
import Link from "next/link";

const Filter = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <h6 className="mb-1 font-bold">Filter</h6>
        <Link className="text-destructive" href={pathname}>
          clear
        </Link>
      </div>

      <RadioGroupFilters />

      <CheckboxFilters />
    </div>
  );
};

export default Filter;

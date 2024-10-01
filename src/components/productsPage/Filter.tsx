"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { RadioGroupFilters, CheckboxFilters } from "./components/FilterItems";
import Link from "next/link";

const Filter = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-4 border-r">
      <div className="flex justify-between">
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

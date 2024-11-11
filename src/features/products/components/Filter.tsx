"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CheckboxFilters } from "./filters/checkbox/CheckboxFilters";
import PriceFilters from "./filters/price/PriceFilters";

const Filter = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-r">
      <div className="mr-2 flex justify-end">
        {/* <Link className="text-destructive" href={pathname}>
          clear
        </Link> */}
      </div>

      <CheckboxFilters />
      <PriceFilters />
    </aside>
  );
};

export default Filter;

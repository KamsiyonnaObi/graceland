import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

import { SortByFilters } from "./filters/sort/SortByFilters";
// import { CheckboxFilters } from "./filters/checkbox/CheckboxFilters";
import PriceFilters from "./filters/price/PriceFilters";

/**
 *  !TODO -- uncomment checkbox filters after products
 *  !TODO -- have been categorized in the DB
 */

const MobileFilters = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center gap-2 rounded-sm p-2 text-xs hover:bg-slate-50">
            <SlidersHorizontal className="w-4" /> Sort and Filter
          </div>
        </SheetTrigger>
        <SheetContent className="space-y-8" side={"bottom"}>
          <SheetHeader className="mb-8 flex items-start">
            <SheetTitle>Sort & Filter</SheetTitle>
          </SheetHeader>

          <SortByFilters />

          <div className="">
            <h3 className="mb-3 text-base font-bold">Filters</h3>
            {/*<CheckboxFilters />*/}
            <PriceFilters />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { SortByFilters } from "./components/FilterItems/SortByFilters";
import { CheckboxFilters } from "./components/FilterItems/CheckboxFilters";

const MobileFilters = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" className="flex gap-2 text-xs">
            <>
              <SlidersHorizontal className="w-4" /> Sort and Filter
            </>
          </Button>
        </SheetTrigger>
        <SheetContent className="space-y-8" side={"bottom"}>
          <SheetHeader className="mb-8 flex items-start">
            <SheetTitle>Sort & Filter</SheetTitle>
          </SheetHeader>

          <SortByFilters />

          <div className="space-y-2">
            <h3 className="text-base font-bold">Filters</h3>
            <CheckboxFilters />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;

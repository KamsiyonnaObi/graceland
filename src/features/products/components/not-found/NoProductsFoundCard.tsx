import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Baby } from "lucide-react";
import ClearAllFilters from "../filters/ClearAllFilters";

const NoProductsFoundCard = () => {
  return (
    <Card className="col-span-2 mx-6 h-fit flex-col items-center border-none bg-slate-100">
      <CardHeader>
        <CardTitle>
          <div className="flex-center gap-2">
            <Baby className="h-10 w-10" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Whoops! We couldn&apos;t find any matches that fit your current
          filters. Adjust your selections or <ClearAllFilters /> to see all
          available products.
        </p>
      </CardContent>
    </Card>
  );
};

export default NoProductsFoundCard;

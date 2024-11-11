import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PackageOpen } from "lucide-react";

const NoOrdersFoundCard = () => {
  return (
    <Card className="w-full flex-col items-center border-none bg-slate-100">
      <CardHeader>
        <CardTitle>
          <div className="flex-center gap-2">
            <PackageOpen className="h-10 w-10" />
            <h6 className="text-lg font-bold">Nothing to show yet!</h6>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          Check back in after you shop online to track your order status and
          more
        </p>
      </CardContent>
    </Card>
  );
};

export default NoOrdersFoundCard;

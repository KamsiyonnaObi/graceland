import { SquareArrowOutUpRight, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const AwaitingPayment = ({ checkoutCode }: { checkoutCode: string }) => {
  return (
    <Alert className="flex flex-col border border-yellow-600">
      <div className="mb-2 flex items-center gap-3">
        <TriangleAlert size={40} className="text-yellow-600" />

        <AlertDescription>
          Your payment is still pending. Please complete payment to process your
          order.
        </AlertDescription>
      </div>

      <Button
        className="ml-auto w-fit rounded-xl bg-secondary-one font-semibold text-black hover:bg-secondary-two"
        asChild
      >
        <a href={`https://checkout.paystack.com/${checkoutCode}`}>
          Complete your payment
          {"  "}
          <SquareArrowOutUpRight className="ml-2" size={14} />
        </a>
      </Button>
    </Alert>
  );
};

export default AwaitingPayment;

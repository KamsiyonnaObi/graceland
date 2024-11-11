import { CreditCard } from "lucide-react";

interface PaymentInfoProps {
  cardType: string;
  cardNumberLast4: string;
}
const PaymentInfo = ({ cardType, cardNumberLast4 }: PaymentInfoProps) => {
  return (
    <>
      <div className="font-semibold">Payment Information</div>
      <dl className="grid gap-3">
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-1 text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            {cardType.toUpperCase()}
          </dt>
          <dd>**** **** **** {cardNumberLast4}</dd>
        </div>
      </dl>
    </>
  );
};

export default PaymentInfo;

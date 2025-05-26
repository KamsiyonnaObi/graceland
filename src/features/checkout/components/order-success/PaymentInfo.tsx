import { CreditCard, Landmark } from "lucide-react";

interface PaymentInfoProps {
  bank: string | null;
  channel: string | null;
  cardType: string;
  cardNumberLast4: string;
}
const PaymentInfo = ({
  cardType,
  bank,
  channel,
  cardNumberLast4,
}: PaymentInfoProps) => {
  return (
    <>
      <div className="font-semibold">Payment Information</div>
      <dl className="grid gap-3">
        <div className="flex items-center justify-between">
          {channel === "card" && (
            <>
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                {cardType.toUpperCase()}
              </dt>
              <dd>**** **** **** {cardNumberLast4}</dd>
            </>
          )}
          {channel === "bank" ||
            (channel === "transfer" && (
              <>
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <Landmark className="h-4 w-4" />
                </dt>
                <dd>Paid from {bank}</dd>
              </>
            ))}
        </div>
      </dl>
    </>
  );
};

export default PaymentInfo;

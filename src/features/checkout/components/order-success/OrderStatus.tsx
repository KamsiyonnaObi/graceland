import { Separator } from "@/components/ui/separator";

interface OrderStatusProps {
  status: string;
  orderUpdatedAt: Date;
  orderfulfilmentType: "PICKUP" | "SHIPPING";
  billingName: string | null;
  pickUpPersonFirstName: string | null;
  pickUpPersonLastName: string | null;
}

const OrderStatus = ({
  status,
  orderUpdatedAt,
  orderfulfilmentType,
  pickUpPersonFirstName,
  pickUpPersonLastName,
  billingName,
}: OrderStatusProps) => {
  return (
    <>
      <p className="font-bold">
        This order was successfully {status} on{" "}
        {orderUpdatedAt.toLocaleString("en-US", {
          dateStyle: "medium",
        })}
        .
      </p>
      {orderfulfilmentType === "PICKUP" && (
        <>
          <Separator className="my-2" />
          <div className="mb-4">
            <p className="text-[14px] font-bold">Pickup Store</p>
            <p className="text-[14px]">Idumota, Lagos</p>
          </div>
          <div>
            <p className="text-[14px] font-bold">Pickup Person</p>
            {pickUpPersonFirstName ? (
              <p className="text-[14px]">
                {pickUpPersonFirstName} {pickUpPersonLastName}
              </p>
            ) : (
              <p className="text-[14px]">{billingName}</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderStatus;

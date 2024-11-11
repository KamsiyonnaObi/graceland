import { Separator } from "@/components/ui/separator";

interface OrderStatusProps {
  status: string;
  orderUpdatedAt: Date;
  pickUpPersonFirstName: string | null;
  pickUpPersonLastName: string | null;
}

const OrderStatus = ({
  status,
  orderUpdatedAt,
  pickUpPersonFirstName,
  pickUpPersonLastName,
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
      {pickUpPersonFirstName && (
        <>
          <Separator className="my-2" />
          <div className="mb-4">
            <p className="text-[14px] font-bold">Pickup Store</p>
            <p className="text-[14px]">Idumota, Lagos</p>
          </div>
          <div>
            <p className="text-[14px] font-bold">Pickup Person</p>
            <p className="text-[14px]">
              {pickUpPersonFirstName} {pickUpPersonLastName}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default OrderStatus;

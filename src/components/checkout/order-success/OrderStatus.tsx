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
          <Separator />
          <div>
            <p>Pickup Store</p>
            <p>Idumota, Lagos</p>
          </div>
          <div>
            <p>Pickup Person</p>
            <p>
              {pickUpPersonFirstName} {pickUpPersonLastName}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default OrderStatus;

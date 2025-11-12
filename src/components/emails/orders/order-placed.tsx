interface OrderProps {
  order: {
    pickUpPersonFirstName: string;
    pickUpPersonLastName: string;
    billingLastName: string;
    billingFirstName: string;
    phoneNumber: string;
    createdAt: Number;
    orderEmail: string;
    trackingNumber: string;
    orderNumber: string;
    trxref: string;
  };
}

export const OrderPlaced = ({ order }: OrderProps) => {
  return (
    <div>
      <p>Hi there,</p>
      <p>
        We&apos;ve received your order. Please complete payment to continue.
      </p>
      <p> Order Details </p>
      <div>
        {" "}
        <p>
          Pickup Person: {order.pickUpPersonFirstName ?? order.billingFirstName}
          , {order.pickUpPersonLastName ?? order.billingLastName}{" "}
        </p>{" "}
      </div>
      <p> Email: {order.orderEmail}</p>
      <p> Phone Number: {order.phoneNumber}</p>
      <p>Pickup Store: 43 Oroyinyin Street, Idumota-Lagos, Nigeria</p>
      <p> Pickup Documents : A valid id showing first name and last name</p>
      <a
        className="underline"
        href={`/checkout/order-success?reference=${order.trxref}`}
      >
        You can view your order summary here
      </a>
      <p>Best,</p> <p>The Graceland Team</p>
    </div>
  );
};

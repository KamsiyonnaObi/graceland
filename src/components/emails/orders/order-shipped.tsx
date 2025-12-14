interface OrderShipped {
  order: {
    trxref: String;
  };
}

export const OrderShipped = ({ order }: OrderShipped) => {
  return (
    <div>
      <p>Hi there,</p>
      <p>Your order has been shipped.</p>
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

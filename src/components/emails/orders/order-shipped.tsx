interface OrderShipped {
    trackingId: string;
  }

export const OrderShipped = ({ trackingId }: OrderShipped) => {
    return (
      <div>
        <p>Hi there,</p>
        <p>
         Your order has been shipped. Tracking ID: {trackingId}
        </p>
       
        <p>Best,</p> <p>The Graceland Team</p>
      </div>
    );
  };
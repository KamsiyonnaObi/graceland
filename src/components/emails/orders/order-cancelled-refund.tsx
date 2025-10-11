interface OrderCancelledRefund {
    refundAmount: number;
  }
  
  

export const OrderCancelledRefund = ({ refundAmount }: OrderCancelledRefund) => {
    return (
      <div>
        <p>Hi there,</p>
        <p>
        Your refund has been processed. Amount: ₦{refundAmount}
        </p>
       
        <p>Best,</p> <p>The Graceland Team</p>
      </div>
    );
  };
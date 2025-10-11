import React from 'react';

interface OrderConfirmationProps {
  order: {
    id: string;
    total: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    customerName: string;
    orderDate: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
}

  export const OrderConfirmation = () => {
    return (
      <div>
        <p>Hi there,</p>
        <p>
       Your order is confirmed and will be prepared soon.
        </p>

        <p>Best,</p> <p>The Graceland Team</p>
      </div>
    );
  };
import { useCartStore } from "@/store/useCartStore";

// Empty Cart
export const clearCart = () => {
  useCartStore.setState({
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
  });
};

export const calculateTotals = (subtotal: number, shippingFee: number) => {
  const taxRate = 0.075;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingFee;
  return { tax, total };
};

const sendOrderConfirmation = (orderDetails: any) => {
  // Send an email or display a confirmation message
  console.log("Order confirmed:", orderDetails);
};

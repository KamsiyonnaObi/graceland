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

export const getSortOptions = (searchParams: any) => {
  let sortValues  = Object.values(searchParams)

  //key map
  const sortKeyMap: { [key: string]: string } = {
    "new": "createdAt",
    "asc": "priceInCents",
    "desc": "priceInCents",
  };
  
  
    const sortField =  sortKeyMap[sortValues[0] as string]
    const sortOrder: "asc" | "desc" = sortValues[0] === "new" || sortValues[0] === "desc" ? "desc" : "asc";
    const options = { sortField, sortOrder }; // Prepare the object with field and order  
   
    return options
}
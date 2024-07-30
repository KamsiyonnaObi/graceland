"use client";
import { useCartStore } from "@/store/useCartStore";
import OrderSummary from "@/components/Cart/OrderSummary";
import DeliveryDetailsForm from "@/components/checkout/DeliveryDetailsForm";
const CheckoutPage = () => {
  const { totalPrice, cartItems } = useCartStore();
  return (
    <div className="page-container py-[60px]">
      <section className="flex w-full gap-5">
        <div className="fex w-3/5 flex-col space-y-4">
          <DeliveryDetailsForm />
        </div>
        <div className="sticky top-4 mb-[275px] h-fit w-2/5 self-start">
          <OrderSummary
            totalPrice={totalPrice}
            cartItems={cartItems}
            isCheckout
          />
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;

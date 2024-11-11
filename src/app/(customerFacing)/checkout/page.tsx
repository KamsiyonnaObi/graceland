import OrderSummary from "@/features/cart/components/OrderSummary";
import DeliveryDetailsForm from "@/features/checkout/containers/DeliveryDetailsForm";
const CheckoutPage = () => {
  return (
    <div className="page-container">
      <section className="flex w-full flex-col gap-5 lg:flex-row">
        <div className="flex flex-col space-y-4 lg:w-3/5">
          <DeliveryDetailsForm />
        </div>
        <div className="h-fit w-full self-start max-lg:order-first lg:sticky lg:top-4 lg:mb-[275px] lg:w-2/5">
          <OrderSummary isCheckout />
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;

import { notFound } from "next/navigation";

import { CircleCheck } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { getOrderByTrxref } from "@/app/admin/_actions/order.actions";

import OrderStatus from "@/components/checkout/order-success/OrderStatus";
import PurchasedProductsCard from "@/components/checkout/order-success/PurchasedProductsCard";
import PaymentInfo from "@/components/checkout/order-success/PaymentInfo";
import BillingInfo from "@/components/checkout/order-success/BillingInfo";
import PurchasedOrderSummary from "@/components/checkout/order-success/PurchasedOrderSummary";

const OrderSuccessPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const trxref = searchParams.reference as string;

  const orderData = await getOrderByTrxref(trxref);

  if (!orderData) {
    return notFound();
  }
  return (
    <div className="page-container">
      <section className="flex w-full flex-col gap-5 lg:flex-row">
        <div className="flex flex-col space-y-4 lg:w-3/5">
          <div className="flex items-center gap-5">
            <CircleCheck className="h-12 w-12 stroke-secondary-two" />
            <div>
              <h1 className="text-2xl font-bold">Order Confirmed #{trxref}</h1>
              <p>Thank you for your purchase! Your order has been confirmed.</p>
            </div>
          </div>
          <div className="rounded-xl border p-6">
            <OrderStatus
              status={orderData.status}
              orderUpdatedAt={orderData?.updatedAt}
              pickUpPersonFirstName={orderData.pickUpPersonFirstName}
              pickUpPersonLastName={orderData.pickUpPersonLastName}
            />
          </div>
          <div className="space-y-2 rounded-xl border p-4">
            {orderData.orderItems.map((item) => (
              <PurchasedProductsCard
                key={item.productId}
                productId={item.productId}
                imagePath={item.product.imagePath}
                priceInCents={item.product.priceInCents}
                productName={item.product.name}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="rounded-xl border p-6">
            <div className="grid grid-cols-2 gap-4">
              <BillingInfo
                shippingAddressId={orderData.shippingAddressId}
                billingAddress={orderData.billingAddress.address}
                billingCountry={orderData.billingAddress.country}
                billingState={orderData.billingAddress.state}
                billingZip={orderData.billingAddress.zipCode}
                phoneNumber={orderData.phoneNumber}
              />
            </div>
            {orderData.paymentInfo && (
              <>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <PaymentInfo
                    cardNumberLast4={orderData.paymentInfo.cardNumberLast4}
                    cardType={orderData.paymentInfo.cardType}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-fit w-full self-start lg:sticky lg:top-4 lg:mb-[275px] lg:w-[375px]">
          <PurchasedOrderSummary
            taxesPaid={orderData.taxesPaid}
            orderItems={orderData.orderItems}
            shippingFeeInCents={orderData.shippingFeeInCents}
            totalPriceInCents={orderData.totalPriceInCents}
          />
        </div>
      </section>
    </div>
  );
};

export default OrderSuccessPage;

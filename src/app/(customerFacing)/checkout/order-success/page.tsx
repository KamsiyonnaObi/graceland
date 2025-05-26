import { notFound } from "next/navigation";

import { CircleCheck } from "lucide-react";

import { getOrderByTrxref } from "@/server/actions/order.actions";

import OrderStatus from "@/features/checkout/components/order-success/OrderStatus";
import PurchasedProductsCard from "@/features/checkout/components/order-success/PurchasedProductsCard";
import PaymentInfo from "@/features/checkout/components/order-success/PaymentInfo";
import BillingInfo from "@/features/checkout/components/order-success/BillingInfo";
import PurchasedOrderSummary from "@/features/checkout/components/order-success/PurchasedOrderSummary";
import AwaitingPayment from "@/features/checkout/components/order-success/AwaitingPayment";

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
    <div className="page-container flex w-full flex-col gap-5 lg:flex-row">
      <section className="flex flex-col space-y-4 lg:w-3/5">
        <div className="flex items-center gap-5">
          <CircleCheck className="h-12 w-12 stroke-secondary-two" />
          <div>
            <h1 className="text-2xl font-bold">Order Confirmed #{trxref}</h1>
            <p>Thank you for your purchase! Your order has been confirmed.</p>
          </div>
        </div>
        {orderData.paymentStatus === "PENDING" &&
          orderData.paystackCheckoutCode && (
            <AwaitingPayment checkoutCode={orderData.paystackCheckoutCode} />
          )}

        <div className="rounded-xl border p-4">
          <OrderStatus
            status={orderData.status}
            orderUpdatedAt={orderData?.updatedAt}
            orderfulfilmentType={orderData?.FulfillmentType}
            pickUpPersonFirstName={orderData.pickUpPersonFirstName}
            pickUpPersonLastName={orderData.pickUpPersonLastName}
            billingName={orderData.fullName}
          />
          {orderData.deliveryNote && (
            <div className="mt-2">
              <i className="text-[14px]">
                <strong>Note: </strong>
                {orderData.deliveryNote}
              </i>
            </div>
          )}
        </div>
        <div className="space-y-2 rounded-xl border p-4">
          {orderData.orderItems.map((item) => (
            <PurchasedProductsCard
              key={item.productId}
              productId={item.productId}
              imagePath={item.product.imagePath}
              priceInCents={item.priceInCents}
              productName={item.product.name}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="flex justify-between rounded-xl border p-4">
          {orderData.shippingAddress && (
            <div className="grid grid-cols-2 gap-4">
              <BillingInfo
                shippingAddressId={orderData.shippingAddressId}
                billingAddress={orderData.shippingAddress.address}
                billingCountry={orderData.shippingAddress.country}
                billingState={orderData.shippingAddress.state}
                billingZip={orderData.shippingAddress.zipCode}
                phoneNumber={orderData.phoneNumber}
              />
            </div>
          )}
          <div className="text-sm">
            <p className="font-semibold">Contact details</p>
            <p>{orderData.fullName}</p>
            <p>{orderData.orderEmail}</p>
            <p>+234{orderData.phoneNumber}</p>
          </div>
        </div>
        {orderData.paymentInfo && (
          <div className="rounded-xl border p-6">
            <div className="grid gap-3">
              <PaymentInfo
                cardNumberLast4={orderData.paymentInfo.cardNumberLast4}
                channel={orderData.paymentInfo.channel}
                cardType={orderData.paymentInfo.cardType}
                bank={orderData.paymentInfo.bank}
              />
            </div>
          </div>
        )}
      </section>

      <section className="h-fit w-full space-y-4 self-start lg:sticky lg:top-4 lg:mb-[275px] lg:w-[375px]">
        <PurchasedOrderSummary
          taxesPaid={orderData.taxesPaid}
          orderItems={orderData.orderItems}
          orderStatus={orderData.status}
          fulfilmentType={orderData.FulfillmentType}
          shippingFeeInCents={orderData.shippingFeeInCents}
          totalPriceInCents={orderData.totalPriceInCents}
        />
      </section>
    </div>
  );
};

export default OrderSuccessPage;

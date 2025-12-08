import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCartStore } from "@/store/useCartStore";
import { checkoutDetailsSchema } from "@/lib/validations/index";
import { createOrder } from "@/server/actions/order.actions";
import { calculateTotals } from "@/utils/checkoutHelpers";
import { sendEmail } from "@/server/actions/notifications.actions";

export const useCheckoutForm = () => {
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const form = useForm<z.infer<typeof checkoutDetailsSchema>>({
    resolver: zodResolver(checkoutDetailsSchema),
    defaultValues: {
      billingFirstName: "",
      billingLastName: "",
      address: "",
      email: "",
      phone: "",
      state: "",
      country: "",
      deliveryNote: "",
    },
  });

  const { shippingFee, totalPriceWithFees, totalPrice, cartItems, isPickUp } =
    useCartStore();

  const initializeTransaction = async (email: string, reference: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/paystack/create-checkout-session",
        {
          products: cartItems,
          amount: totalPriceWithFees,
          email,
          reference,
        },
      );

      const { checkoutURL, checkoutCode } = response.data;

      return { checkoutCode: checkoutCode, checkoutURL: checkoutURL };
    } catch (error) {
      console.error("Error initializing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof checkoutDetailsSchema>) => {
    const { tax } = calculateTotals(totalPrice, shippingFee);
    // Only include shipping address if fulfilment type is SHIPPING
    const shippingAddress =
      values.fulfilmentType === "SHIPPING"
        ? {
            address: values.address!,
            state: values.state!,
            country: values.country!,
          }
        : undefined;

    const orderDetails = {
      shippingFee,
      totalPriceWithFees,
      paystackCheckoutCode: "",
      taxesPaid: tax,
      taxRate: 0.075,
      fulfilmentType: values.fulfilmentType,
      orderEmail: values.email,
      phoneNumber: values.phone,
      pickUpPersonFirstName: values.pickUpPersonFirstName,
      pickUpPersonLastName: values.pickUpPersonLastName,
      billingFirstName: values.billingFirstName,
      billingLastName: values.billingLastName,
      deliveryNote: values.deliveryNote || "",
      trxref: new Date().getTime().toString(),
    };

    try {
      const paystackCodes = await initializeTransaction(
        values.email,
        orderDetails.trxref,
      );

      if (!paystackCodes?.checkoutCode) {
        throw new Error("Failed to create checkout code");
      } else if (!paystackCodes?.checkoutURL) {
        throw new Error("Failed to create checkout Url");
      }

      const customerOrder = await createOrder(
        {
          ...orderDetails,
          paystackCheckoutCode: paystackCodes.checkoutCode,
        },
        cartItems,
        shippingAddress,
      );

      if (!customerOrder?.createdOrder?.id) {
        throw new Error("Failed to create order");
      }

      await sendEmail({
        to: values.email,
        subject: "Order Placed - Graceland",
        template: "order-placed",
        data: {
          order: customerOrder.createdOrder,
          items: cartItems,
          shippingAddress: shippingAddress,
        },
      });

      window.location.href = paystackCodes.checkoutURL;
    } catch (error) {
      toast.error("Order creation failed");
      console.error(error);
    }
  };

  return { form, loading, onSubmit };
};

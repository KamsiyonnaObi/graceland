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

export const useCheckoutForm = () => {
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const form = useForm<z.infer<typeof checkoutDetailsSchema>>({
    resolver: zodResolver(checkoutDetailsSchema),
    defaultValues: {
      pickUpPersonFirstName: "",
      pickUpPersonLastName: "",
      pickUpPerson: "customer",
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

  const { shippingFee, totalPriceWithFees, totalPrice, cartItems } =
    useCartStore();

  const initializeTransaction = async (email: string, reference: string) => {
    setLoading(true);
    try {
      // Send a POST request to your server to create a Paystack checkout session
      const response = await axios.post(
        "/api/paystack/create-checkout-session",
        {
          products: cartItems,
          amount: totalPriceWithFees,
          email,
          reference,
        },
      );

      const { checkoutURL } = response.data;

      // Redirect to Paystack payment page in the same tab
      window.location.href = checkoutURL;
    } catch (error) {
      console.error("Error initializing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof checkoutDetailsSchema>) => {
    const { tax } = calculateTotals(totalPrice, shippingFee);
    const billingAddress = {
      address: values.address,
      state: values.state,
      country: values.country,
    };

    const orderDetails = {
      totalPriceWithFees,
      shippingFee,
      taxesPaid: tax,
      taxRate: 0.075,
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
      const customerOrder = await createOrder(
        orderDetails,
        cartItems,
        billingAddress,
      );

      if (!customerOrder?.createdOrder?.id) {
        throw new Error("Failed to create order");
      }

      initializeTransaction(values.email, orderDetails.trxref);
    } catch (error) {
      toast.error("Order creation failed");
      console.error(error);
    }
  };

  return { form, loading, onSubmit };
};

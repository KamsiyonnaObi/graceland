import { useState, useCallback } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clearCart } from "@/utils/checkoutHelpers";

type PaystackConfig = {
  reference: string;
  email: string;
  amount: number;
  currency: string;
  publicKey: string;
};

type PaystackResponse = {
  redirecturl: string;
  status: string;
  trxref: string;
};

export const usePaystack = (config: PaystackConfig) => {
  const [transactionReference, setTransactionReference] = useState(
    config.reference,
  );
  const router = useRouter();

  const initializePayment = usePaystackPayment(config);

  const startPayment = useCallback(() => {
    initializePayment({
      onSuccess: (reference: PaystackResponse) => {
        clearCart();
        router.push(`/checkout/order-success${reference.redirecturl}`);
        toast.success(`Payment successful: ${reference.status}`, {
          duration: 2000,
        });
        setTransactionReference(reference.trxref);
        console.log("Payment successful: ", reference);
      },

      onClose: () => {
        toast.info("Payment closed");
        console.log("Payment closed");
      },
    });
  }, [initializePayment]);

  return {
    startPayment,

    transactionReference,
  };
};

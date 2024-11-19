"use client";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { clearCart } from "@/utils/checkoutHelpers";

const ProcessOrderLoader = () => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const trxref = queryParams.get("reference");
  useEffect(() => {
    const onSuccessfulOrder = () => {
      if (!trxref) {
        toast.error("bad request", { duration: 2000 });
        router.back();
        return;
      }
      clearCart();
      router.push(`/checkout/order-success?reference=${trxref}`);
    };
    onSuccessfulOrder();
  }, [trxref, router]);

  return (
    <section className="page-container">
      <div className="flex-center flex-col">
        <h1 className="mb-5 text-3xl font-semibold">Creating your order</h1>
        <Loader size={75} className="animate-spin" />
      </div>
    </section>
  );
};

export default ProcessOrderLoader;

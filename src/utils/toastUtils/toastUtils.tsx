// utils/toastUtils.ts
import { toast } from "sonner";
import AddToCartToast from "@/components/toasts/AddToCartToast";

export const showAddToCartSuccess = (
  name: string,
  price: number,
  image: string,
) => {
  toast.success(
    <AddToCartToast productName={name} price={price} imagePath={image} />,
    {
      position: "bottom-right",
    },
  );
};

export const showCartError = (message = "Failed to add item to cart") => {
  toast.error(message, {
    position: "bottom-right",
    closeButton: true,
  });
};

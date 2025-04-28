import { useCartStore } from "@/store/useCartStore";
import {
  showAddToCartSuccess,
  showCartError,
} from "@/utils/toastUtils/toastUtils";

type Params = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imagePath: string;
};

export const useCartActions = () => {
  const { onAddCartItem } = useCartStore();

  const addToCart = (params: Params) => {
    try {
      onAddCartItem(
        {
          id: params.id,
          name: params.name,
          quantity: params.quantity,
          price: params.price,
          imagePath: params.imagePath,
        },
        params.quantity,
      );
      showAddToCartSuccess(params.name, params.price, params.imagePath);
    } catch (error) {
      showCartError();
    }
  };

  return { addToCart };
};

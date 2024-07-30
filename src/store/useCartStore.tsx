import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imagePath: string;
}

interface CartState {
  showCart: boolean;
  orderEmail: string;
  cartItems: CartItem[];
  shippingFee: number;
  totalPrice: number;
  totalQuantities: number;
  totalPriceWithFees: number;
  qty: number;
  setShowCart: (show: boolean) => void;
  setShippingFee: (shippingFee: number) => void;
  setTotalPriceWithFees: (totalPrice: number) => void;
  setOrderEmail: (newOrderEmail: string) => void;
  incQty: () => void;
  decQty: () => void;
  onAddCartItem: (product: CartItem, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
}
function addToCartToast() {
  toast.success("Added to Cart", {
    duration: 2000,
  });
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      showCart: false,
      orderEmail: "",
      cartItems: [],
      shippingFee: 0,
      totalPrice: 0,
      totalPriceWithFees: 0,
      totalQuantities: 0,
      qty: 1,

      setShowCart: (show) => set({ showCart: show }),

      setOrderEmail: (newOrderEmail) => set({ orderEmail: newOrderEmail }),

      setShippingFee: (newShippingFee) => set({ shippingFee: newShippingFee }),

      setTotalPriceWithFees: (newTotalPriceWithFees) =>
        set({ totalPriceWithFees: newTotalPriceWithFees }),

      incQty: () => set((state) => ({ qty: state.qty + 1 })),

      decQty: () =>
        set((state) => ({ qty: state.qty > 1 ? state.qty - 1 : 1 })),

      onAddCartItem: (product, quantity) => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const checkProductInCart = cartItems.find(
          (item) => item.id === product.id,
        );

        if (checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct.id === product.id) {
              return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity,
              };
            }
            return cartProduct;
          });
          set({
            cartItems: updatedCartItems,
            totalPrice: totalPrice + product.price * quantity,
            totalQuantities: totalQuantities + quantity,
          });
          addToCartToast();
        } else {
          product.quantity = quantity;
          set({
            cartItems: [...cartItems, { ...product }],
            totalPrice: totalPrice + product.price * quantity,
            totalQuantities: totalQuantities + quantity,
          });
          addToCartToast();
        }
      },

      onRemoveCartItem: (productId) => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const foundProduct = cartItems.find((item) => item.id === productId);
        if (foundProduct) {
          const newCartItems = cartItems.filter(
            (item) => item.id !== productId,
          );

          set({
            cartItems: newCartItems,
            totalPrice: totalPrice - foundProduct.price * foundProduct.quantity,
            totalQuantities: totalQuantities - foundProduct.quantity,
          });
        }
      },

      toggleCartItemQuantity: (id, value) => {
        const { cartItems, totalPrice, totalQuantities } = get();
        const foundProduct = cartItems.find((item) => item.id === id);

        if (foundProduct) {
          if (value === "inc") {
            const newCartItems = cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            );

            set({
              cartItems: newCartItems,
              totalPrice: totalPrice + foundProduct.price,
              totalQuantities: totalQuantities + 1,
            });
          } else if (value === "dec" && foundProduct.quantity > 1) {
            const newCartItems = cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            );

            set({
              cartItems: newCartItems,
              totalPrice: totalPrice - foundProduct.price,
              totalQuantities: totalQuantities - 1,
            });
          }
        }
      },
    }),
    {
      name: "cart-storage", // Name of the key in localStorage
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        totalQuantities: state.totalQuantities,
      }), // Specify which parts of the state to persist
    },
  ),
);

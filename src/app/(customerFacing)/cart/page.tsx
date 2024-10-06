"use client";

import { useCartStore } from "@/store/useCartStore";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartCard from "@/components/Cart/CartCard";
import OrderSummary from "@/components/Cart/OrderSummary";

const Cart = () => {
  const { cartItems } = useCartStore();
  return (
    <div className="page-container">
      {cartItems.length > 0 ? (
        <>
          <h1 className="py-3 font-montserrat text-3xl font-bold">
            Shopping Cart: {cartItems.length} items
          </h1>
          <section className="grid grid-cols-1 gap-5 max-lg:mx-auto max-lg:content-center lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-2">
                {cartItems.map((item) => (
                  <CartCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    qty={item.quantity}
                    imagePath={item.imagePath}
                  />
                ))}
              </div>
            </div>
            <div className="max-lg:row-start-1">
              <OrderSummary />
            </div>
          </section>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;

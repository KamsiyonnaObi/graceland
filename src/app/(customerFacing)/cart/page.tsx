"use client";

import { useCartStore } from "@/store/useCartStore";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartCard from "@/components/Cart/CartCard";
import OrderSummary from "@/components/Cart/OrderSummary";

const Cart = () => {
  const { totalPrice, cartItems } = useCartStore();
  return (
    <div className="page-container">
      {cartItems.length > 0 ? (
        <>
          <h1 className="py-3 font-montserrat text-3xl font-bold">
            Shopping Cart: {cartItems.length} items
          </h1>
          <section className="grid w-full grid-cols-3 gap-5">
            <div className="col-span-2">
              <div className="flex flex-col gap-3">
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
            <div>
              <OrderSummary totalPrice={totalPrice} cartItems={cartItems} />
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

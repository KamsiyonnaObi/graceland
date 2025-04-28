"use client";

import { useState } from "react";
import { useCartActions } from "../../hooks/useCartActions";

import QuantityButton from "../../components/products-page/QuantityButton";
import AddToCart from "../../components/AddToCartButton";

type AddToCartContainerProps = {
  productId: string;
  productName: string;
  price: number;
  imagePath: string;
};

const AddToCartContainer = ({
  productId,
  productName,
  price,
  imagePath,
}: AddToCartContainerProps) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCartActions();

  const toggleCartQuantity = (action: "inc" | "dec") => {
    setQty((prev) => (action === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: productName,
      quantity: qty,
      price,
      imagePath,
    });
  };

  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <QuantityButton qty={qty} toggleCartQuantity={toggleCartQuantity} />
      <AddToCart
        productId={productId}
        productName={productName}
        price={price}
        imagePath={imagePath}
        qty={qty}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default AddToCartContainer;

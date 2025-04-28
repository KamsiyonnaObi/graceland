import { Button } from "@/components/ui/button";

type AddToCartProps = {
  productId: string;
  productName: string;
  price: number;
  imagePath: string;
  qty: number;
  onAddToCart: () => void;
};

const AddToCart = ({ qty, onAddToCart }: AddToCartProps) => {
  return (
    <div className="w-full">
      <Button
        className="w-full rounded-full font-bold"
        size="lg"
        onClick={onAddToCart}
        disabled={qty < 1}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default AddToCart;

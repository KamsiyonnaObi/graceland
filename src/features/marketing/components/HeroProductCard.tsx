import Image from "next/image";
import { heroProduct } from "../../../types";

interface HeroProductCardProps {
  imgURL: heroProduct;
  changeBigProductImage: (productImg: string | StaticImageData) => void;
  BigProductImage: string | StaticImageData;
}

const HeroProductCard = ({
  imgURL,
  changeBigProductImage,
  BigProductImage,
}: HeroProductCardProps) => {
  const handleClick = () => {
    if (BigProductImage !== imgURL.large) {
      changeBigProductImage(imgURL.large);
    }
  };

  return (
    <div
      className={`rounded-2xl border-2 ${
        BigProductImage === imgURL.large
          ? "border-tertiary-one"
          : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center rounded-2xl bg-card bg-secondary-dark bg-cover bg-center max-sm:p-4 sm:h-40 sm:w-40">
        <Image
          src={imgURL.thumbnail}
          alt="product collection"
          width={127}
          height={103}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default HeroProductCard;

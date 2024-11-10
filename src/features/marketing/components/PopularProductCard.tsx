import Image from "next/image";
import { star } from "../../../../public/assets/icons";

interface ProductCardProps {
  imgURL: string | StaticImageData;
  name: string;
  price: string;
  rating: number;
}
const PopularProductCard = ({
  imgURL,
  name,
  price,
  rating,
}: ProductCardProps) => {
  return (
    <div className="flex w-full flex-1 flex-col max-sm:w-full">
      <Image
        src={imgURL}
        alt={name}
        className="h-[280px] w-[280px] rounded-full bg-secondary-one"
      />
      <div className="mt-8 flex justify-start gap-2.5">
        <Image src={star} alt="rating icon" width={24} height={24} />
        <p className="font-montserrat text-xl leading-normal text-slate-gray">
          {rating}
        </p>
      </div>
      <h3 className="mt-2 font-palanquin text-2xl font-semibold leading-normal">
        {name}
      </h3>
      <p className="mt-2 font-montserrat text-2xl font-semibold leading-normal text-secondary-dark">
        {price}
      </p>
    </div>
  );
};

export default PopularProductCard;

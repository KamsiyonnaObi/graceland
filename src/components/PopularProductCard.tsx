import Image from 'next/image'
import { star } from '../../public/assets/icons';

interface ProductCardProps {
  imgURL: string | StaticImageData;
  name: string;
  price: string;
  rating: number
}
const PopularProductCard = ({ imgURL, name, price, rating }: ProductCardProps) => {
  return (
    <div className="flex flex-1 flex-col w-full max-sm:w-full">
      <Image src={imgURL} alt={name} className="w-[280px] h-[280px] bg-secondary-one rounded-full" />
      <div className="mt-8 flex justify-start gap-2.5">
        <Image src={star} alt="rating icon" width={24} height={24} />
        <p className="font-montserrat text-xl leading-normal text-slate-gray">
          {rating}
        </p>
      </div>
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
        {name}
      </h3>
      <p className="mt-2 font-semibold font-montserrat text-secondary-dark text-2xl leading-normal">
        {price}
      </p>
    </div>
  );
};

export default PopularProductCard;
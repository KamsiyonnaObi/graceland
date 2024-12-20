import Image from "next/image";
import { star } from "public/assets/icons";

interface ReviewCardProps {
  imgURL: string | StaticImageData;
  customerName: string;
  rating: number;
  feedback: string;
}

const ReviewCard = ({
  imgURL,
  customerName,
  rating,
  feedback,
}: ReviewCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-4">
        <Image
          src={imgURL}
          alt="customer"
          className="h-[48px] w-[48px] rounded-full object-cover"
        />
        <p className="info-text max-w-sm">{feedback}</p>
      </div>
      <div className="flex items-center justify-center gap-2.5">
        <h3 className="text-center font-palanquin text-3xl font-bold">
          {customerName}
        </h3>
        <Image
          src={star}
          width={20}
          height={20}
          alt="rating star"
          className="m-0 object-contain"
        />
        <p className="font-montserrat text-lg text-slate-gray">({rating})</p>
      </div>
    </div>
  );
};

export default ReviewCard;

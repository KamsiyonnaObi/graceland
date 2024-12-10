"use client";
import Image from "next/image";
import { useState } from "react";

import { twinstroller } from "public/assets/images";

import HeroProductCard from "./HeroProductCard";
import { heroProducts } from "@/constants";

const HeroCarousel = () => {
  const [bigShoeImage, setBigShoeImage] = useState<string | StaticImageData>(
    twinstroller,
  );
  const handleClick = (img: string | StaticImageData) => {
    setBigShoeImage(img);
  };

  return (
    <div className="relative flex w-full flex-1 items-center justify-center bg-secondary-one bg-hero bg-cover bg-center max-xl:py-40 xl:min-h-screen">
      <div className="relative h-[500px] w-[610px]">
        <Image
          src={bigShoeImage}
          alt="featured product"
          className="object-contain"
          fill
        />
      </div>
      <div className="absolute -bottom-[5%] flex gap-4 max-sm:px-6 sm:left-[10%] sm:gap-6">
        {heroProducts.map((heroProduct, index) => (
          <div key={`${heroProduct.thumbnail}-${index}`}>
            <HeroProductCard
              imgURL={heroProduct}
              changeBigProductImage={handleClick}
              BigProductImage={bigShoeImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

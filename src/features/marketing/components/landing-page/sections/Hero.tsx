"use client";

import { useState } from "react";
import Image from "next/image";

import { arrowRight } from "../../../public/assets/icons";
import { bigStroller1 } from "../../../public/assets/images";
import MainButton from "../Button";
import HeroProductCard from "../HeroProductCard";

import { statistics, strollers } from "../../constants";
import Link from "next/link";
const Hero = () => {
  const [bigShoeImage, setBigShoeImage] = useState<string | StaticImageData>(
    bigStroller1,
  );
  const handleClick = (img: string | StaticImageData) => {
    setBigShoeImage(img);
  };
  return (
    <section
      id="home"
      className="max-container flex min-h-screen w-full flex-col justify-center gap-10 xl:flex-row"
    >
      <div className="max-xl:padding-x relative flex w-full flex-col items-start justify-center pt-28 xl:w-2/5">
        <p className="font-montserrat text-xl font-bold text-secondary-dark">
          Welcome to Graceland
        </p>
        <h1 className="mt-10 font-palanquin text-6xl font-bold max-sm:text-5xl max-sm:leading-[60px]">
          <span className="relative z-10 pr-10 xl:whitespace-nowrap xl:bg-white">
            All Round
          </span>
          <br />
          <span className="mt-3 inline-block text-secondary-dark">
            Baby{" "}
          </span>{" "}
          Products
        </h1>
        <p className="mb-14 mt-6 font-montserrat text-lg leading-8 text-slate-gray sm:max-w-sm">
          Discover stylish and innovative baby products for your little
          one&apos;s comfort and safety.
        </p>
        <Link href={"/products"}>
          <MainButton label="Shop Now" iconURL={arrowRight} />
        </Link>
        <div className="justify-starts mt-20 flex w-full flex-wrap items-start gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="font-palanquin text-4xl font-bold">{stat.value}</p>
              <p className="font-montserrat leading-7 text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex w-full flex-1 items-center justify-center bg-secondary-one bg-hero bg-cover bg-center max-xl:py-40 xl:min-h-screen">
        <Image
          src={bigShoeImage}
          alt="shoe collection"
          width={610}
          height={500}
          className="relative z-10 object-contain"
        />
        <div className="absolute -bottom-[5%] flex gap-4 max-sm:px-6 sm:left-[10%] sm:gap-6">
          {strollers.map((stroller) => (
            <div key={`${stroller.thumbnail}`}>
              <HeroProductCard
                imgURL={stroller}
                changeBigProductImage={handleClick}
                BigProductImage={bigShoeImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

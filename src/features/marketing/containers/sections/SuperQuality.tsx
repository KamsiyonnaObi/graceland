import Image from "next/image";
import Link from "next/link";

import MainButton from "../../components/MainButton";

import { family1 } from "public/assets/images";

const SuperQuality = () => {
  return (
    <section
      id="about-us"
      className="max-container flex w-full items-center justify-between gap-10 max-lg:flex-col"
    >
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl font-bold capitalize lg:max-w-lg">
          Discover Our Range of
          <span className="text-secondary-dark"> Baby Products</span>
        </h2>
        <p className="info-text mt-4 lg:max-w-lg">
          Prioritize safety, comfort, and style with our thoughtfully curated
          baby essentials. Designed with innovation and unmatched quality in
          mind.
        </p>
        <p className="info-text mt-6 lg:max-w-lg">
          From cozy baby beds to interactive walkers and premium car seats,
          explore a wide range of essentials that deliver exceptional value and
          satisfaction.
        </p>
        <Link href={"/products"} className="mt-11">
          <MainButton label="Explore Products" />
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Image
          src={family1}
          alt="about us"
          width={570}
          height={522}
          className="rounded-lg object-contain"
        />
      </div>
    </section>
  );
};

export default SuperQuality;

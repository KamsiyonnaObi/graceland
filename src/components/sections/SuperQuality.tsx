import Image from "next/image";

import MainButton from "../Button";
import { family1 } from "../../../public/assets/images";
import Link from "next/link";

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
          Ensuring safety, comfort, and style for your little ones, our curated
          collection of baby essentials is designed to provide unmatched quality
          and innovation.
        </p>
        <p className="info-text mt-6 lg:max-w-lg">
          From cozy baby beds to interactive walkers and premium car seats,
          explore our range that guarantees satisfaction.
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

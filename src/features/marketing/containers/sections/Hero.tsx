import Link from "next/link";

import MainButton from "../../components/MainButton";

import { statistics } from "@/constants";
import { arrowRight } from "public/assets/icons";
import HeroCarousel from "../../components/hero/HeroCarousel";

const Hero = () => {
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
            Baby
          </span>{" "}
          Products
        </h1>
        <p className="mb-14 mt-6 font-montserrat text-lg leading-8 text-slate-gray sm:max-w-sm">
          Discover eco-friendly, safe, and affordable baby essentials designed
          for comfort, style, and innovation. Trusted by parents nationwide.
        </p>
        <Link href={"/products"}>
          <MainButton label="Shop Now" iconURL={arrowRight} />
        </Link>
        {/* <div className="justify-starts mt-20 flex w-full flex-wrap items-start gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="font-palanquin text-4xl font-bold">{stat.value}</p>
              <p className="font-montserrat leading-7 text-slate-gray">
                {stat.label}
              </p>
            </div>
          ))}
        </div> */}
      </div>
      <HeroCarousel />
    </section>
  );
};

export default Hero;

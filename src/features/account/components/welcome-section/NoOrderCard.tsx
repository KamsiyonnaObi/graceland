import Link from "next/link";

const NoOrderCard = () => {
  return (
    <>
      <div className="pb-4">
        Thank you for signing up! Take a look at our latest products and make
        your first order!
      </div>
      <Link
        className="w-full rounded-md bg-secondary-one p-3 text-center font-bold hover:bg-opacity-75 active:bg-secondary-dark active:text-white"
        href={"/products"}
      >
        Explore our products
      </Link>
    </>
  );
};

export default NoOrderCard;

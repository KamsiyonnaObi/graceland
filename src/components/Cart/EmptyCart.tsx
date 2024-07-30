import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { cart } from "../../../public/assets/icons";

const EmptyCart = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-[80px] w-[80px]">
        <Image src={cart} alt="cart-icon" fill />
      </div>
      <div className="space-y-2 text-center">
        {status === "authenticated" ? (
          <>
            <h1 className="text-2xl font-bold">
              Hi {session?.user?.name}, your shopping cart is empty.
            </h1>
            <p>explore our categories and more.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Your shopping cart is empty</h1>
            <p>Have an account? Sign in to see your cart</p>
          </>
        )}
      </div>

      <Link
        className="w-full max-w-[384px] rounded-full bg-secondary-one py-3 text-center font-bold hover:bg-opacity-75 active:bg-secondary-dark active:text-white"
        href={`/${status === "authenticated" ? "products" : "login"}`}
      >
        {`${status === "authenticated" ? "Continue Shopping" : "Sign In"}`}
      </Link>
    </div>
  );
};

export default EmptyCart;

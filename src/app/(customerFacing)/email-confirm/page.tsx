import Link from "next/link";
import React from "react";

import { verifyUserEmail } from "@/utils/actions/user.actions";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const { success: isTokenValid } = await verifyUserEmail(searchParams.token);
  return (
    <div className="py-[72px] lg:py-[152px]">
      <div className="mx-auto w-fit space-y-4">
        <h1 className="text-2xl font-bold">
          {isTokenValid
            ? "Congratulations! Your email is verified"
            : "Your token has expired"}
        </h1>
        <Link
          className="mt-4 flex justify-center rounded-2xl bg-secondary-one px-10 py-2 font-bold hover:bg-secondary-two"
          href={isTokenValid ? "/products" : "/login"}
        >
          {isTokenValid ? "View Products" : "Sign In"}
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

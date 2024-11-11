import React from "react";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { isTokenValid } from "@/server/actions/token.actions";
import { RecoverPasswordForm } from "@/components/auth/RecoverPassowordForm";

const ForgotPasswordPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const { userId } = await isTokenValid(searchParams.token);

  return (
    <div className="auth-container mx-auto max-w-[492px] bg-white p-5">
      {userId ? (
        <div className="space-y-4">
          <ForgotPasswordForm />
        </div>
      ) : (
        <div className="space-y-4">
          <RecoverPasswordForm tokenExpired />
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;

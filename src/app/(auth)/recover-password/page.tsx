import React from "react";
import { RecoverPasswordForm } from "@/features/auth/containers/recover-password/RecoverPassowordForm";

const RecoverPasswordPage = () => {
  return (
    <div className="auth-container mx-auto max-w-[492px] bg-white">
      <div className="space-y-4 p-5">
        <RecoverPasswordForm />
      </div>
    </div>
  );
};

export default RecoverPasswordPage;

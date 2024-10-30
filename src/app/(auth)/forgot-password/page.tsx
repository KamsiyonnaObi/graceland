import React from "react";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="auth-container mx-auto bg-white">
      <div className="space-y-4 p-5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

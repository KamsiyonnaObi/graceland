import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChangePasswordFormSchema } from "@/lib/validations";
export const useForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordFormSchema>) => {
    const token = searchParams.get("token");
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password: data.newPassword,
          confirmPassword: data.confirmNewPassword,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setErrorMessage(
          message || "oops, something went wrong. Please try again later",
        );
        setIsSuccess(false);
        return;
      }
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, isSuccess, errorMessage, onSubmit };
};

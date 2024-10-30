import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChangePasswordFormSchema } from "@/lib/validations";

export const useForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordFormSchema>) => {
    // try {
    //   await fetch("/api/auth/recover-password", {
    //     method: "POST",
    //     body: JSON.stringify({ email: data.email }),
    //   });
    //   setIsSuccess(true);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(data);
  };
  function toggleIsSubmitted() {
    setIsSuccess((prev) => !prev);
  }

  return { form, isSuccess, onSubmit, toggleIsSubmitted };
};

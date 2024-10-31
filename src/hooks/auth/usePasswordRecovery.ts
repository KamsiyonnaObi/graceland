import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  email: z.string().email(),
});

export const usePasswordRecovery = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);
      await fetch("/api/auth/recover-password", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  function toggleIsSubmitted() {
    setIsSubmitted((prev) => !prev);
  }

  return { form, isSubmitted, isLoading, onSubmit, toggleIsSubmitted };
};

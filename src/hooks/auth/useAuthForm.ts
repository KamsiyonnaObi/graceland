import { z } from "zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authFormSchema } from "@/lib/validations";
import { newUser } from "@/utils/actions/user.actions";

export const useAuthForm = () => {
  const formSchema = authFormSchema("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const router = useRouter();
  const handleSignUp = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setIsFailed(false);

    try {
      const response = await newUser(data);

      if (response?.status !== 200) {
        return setIsFailed(true);
      }
      toast("SignUp successful.", {
        duration: 2000,
      });
      router.push(`/`);
    } catch (error) {
      console.log(`This is your error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogIn = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        return setIsFailed(true);
      } else {
        setIsFailed(false);
        router.push(`/`);
        toast.success("Login successful.", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(`This is your error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isFailed, handleLogIn, handleSignUp };
};

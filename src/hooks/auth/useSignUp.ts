import { useState } from "react";
import { useRouter } from "next/navigation";

import { SignUp } from "@/app/(auth)/signup/page";
import { toast } from "sonner";

import { newUser } from "@/app/admin/_actions/user.actions";

export const useSignUp = () => {
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (data: SignUp) => {
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
  return {
    isLoading,
    isFailed,
    handleSignUp,
  };
};

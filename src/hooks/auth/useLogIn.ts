import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "@/app/(auth)/login/page";
import { signUserOut } from "@/app/admin/_actions/user.actions";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const useLogin = () => {
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogIn = async (data: LogIn) => {
    setIsLoading(true);
    setIsFailed(false);
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
  const handleSignOut = async () => {
    await signUserOut();
    window.location.reload();
    toast("Signed Out");
  };
  return {
    isLoading,
    isFailed,
    handleLogIn,
    handleSignOut,
  };
};

"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useLogin } from "@/hooks/auth/useLogIn";
import { authFormSchema } from "@/lib/validations";
import FillIcon from "../icons/FillIcons";
import { signIn } from "next-auth/react";
import { Separator } from "../ui/separator";
import CustomInput from "../shared/CustomInput";

const AuthForm = ({ type }: { type: string }) => {
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isLoading, handleLogIn } = useLogin();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogIn)}
        className="auth-containers"
      >
        <CustomInput
          name="email"
          placeholder="email"
          label="Email"
          control={form.control}
        />
        <CustomInput
          name="password"
          placeholder="Enter your password"
          label="Password"
          control={form.control}
        />

        <Button
          className="text-md mt-4 p-6 font-bold"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
            </>
          ) : type === "signin" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </Button>
        <Separator className="my-2" />

        <Button
          type="button"
          className="bg-slate-800 p-6 text-lg font-bold hover:bg-slate-500"
          onClick={() => {
            signIn("google", { callbackUrl: "/" });
          }}
        >
          <FillIcon.Google className="mr-3 fill-white" />
          {type === "signin" ? "Sign In with Google" : "Sign Up with Google"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;

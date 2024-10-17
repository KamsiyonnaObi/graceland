"use client";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { authFormSchema } from "@/lib/validations";
import FillIcon from "../icons/FillIcons";
import { Separator } from "../ui/separator";
import CustomInput from "../shared/CustomInput";
import { useAuthForm } from "@/hooks/auth/useAuthForm";

const AuthForm = ({ type }: { type: "signup" | "signin" }) => {
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isLoading, isFailed, handleLogIn, handleSignUp } = useAuthForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          type === "signup" ? handleSignUp : handleLogIn,
        )}
        className="auth-containers"
      >
        {type === "signup" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex w-full flex-col gap-2">
                <CustomInput
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  control={form.control}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <CustomInput
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  control={form.control}
                />
              </div>
            </div>
          </>
        )}
        <CustomInput
          name="email"
          placeholder="Email"
          label="Email"
          control={form.control}
        />
        <CustomInput
          name="password"
          placeholder="Enter your password"
          label="Password"
          type={"password"}
          control={form.control}
        />
        {type === "signup" && (
          <CustomInput
            name="confirmPassword"
            placeholder="Re-enter your password"
            label="Confirm Password"
            type={"password"}
            control={form.control}
          />
        )}

        {isFailed && (
          <p className="text-center text-destructive">
            oops, something went wrong
          </p>
        )}
        <Button
          className="text-md mt-4 p-6 font-bold"
          disabled={
            isLoading ||
            form.watch("confirmPassword") !== form.watch("password")
          }
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

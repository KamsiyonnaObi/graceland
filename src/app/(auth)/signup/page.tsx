"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signUpFormSchema } from "@/lib/validations";
import { useSignUp } from "@/hooks/auth/useSignUp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import FillIcon from "@/components/icons/FillIcons";
import { Separator } from "@/components/ui/separator";

export type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUp>({ resolver: zodResolver(signUpFormSchema) });
  const router = useRouter();

  const { handleSignUp, isLoading, isFailed } = useSignUp();

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="auth-containers rounded-xl"
    >
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p className="text-slate-gray">
        Enter your information to create an account
      </p>
      {errors.firstName && (
        <p className="text-destructive">{errors.firstName?.message}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full flex-col gap-2">
          <label>First name</label>
          <input
            className="rounded-md border p-2"
            placeholder="Peter"
            {...register("firstName")}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="last-name">Last name</label>
          <input
            className="rounded-md border p-2"
            placeholder="Obi"
            {...register("lastName")}
          />
        </div>
      </div>
      {errors.lastName && (
        <p className="text-xs text-destructive">{errors.lastName?.message}</p>
      )}
      <div className="grid gap-2">
        <label className="text-sm">Email</label>
        {errors.email && (
          <p className="text-destructive">{errors.email.message}</p>
        )}
        <input
          className="rounded-md border p-2"
          placeholder="john@email.com"
          {...register("email")}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Password</label>
        {errors.password && (
          <p className="text-destructive">{errors.password.message}</p>
        )}
        <input
          className="rounded-md border p-2"
          type="password"
          {...register("password")}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Confirm Password</label>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <input
          className="rounded-md border p-2"
          type="password"
          {...register("confirmPassword")}
        />
      </div>

      <hr />

      <button
        type="submit"
        className="rounded-md bg-secondary-dark px-4 py-2 font-bold text-white disabled:bg-primary-two disabled:bg-opacity-80"
        disabled={
          isLoading ||
          !watch("password") ||
          watch("password") !== watch("confirmPassword")
        }
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
      {isFailed && (
        <p className="text-center text-destructive">
          oops, something went wrong
        </p>
      )}
      <Separator className="my-2" />

      <Button
        type="button"
        className="bg-slate-800 text-lg font-bold hover:bg-slate-500"
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
      >
        <FillIcon.Google className="mr-3 fill-white" />
        Sign up with Google
      </Button>
      <p className="mt-2 text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="font-bold text-tertiary-one underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpPage;

"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "@/hooks/auth/useLogIn";
import { LogInFormSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import FillIcon from "@/components/icons/FillIcons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export type LogIn = {
  email: string;
  password: string;
};

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LogIn>({ resolver: zodResolver(LogInFormSchema) });

  const { isFailed, isLoading, handleLogIn } = useLogin();
  return (
    <form
      onSubmit={handleSubmit(handleLogIn)}
      className="auth-containers rounded-xl"
    >
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-slate-gray">
        Enter your email below to login to your account
      </p>

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

      <Button
        type="submit"
        className="rounded-md bg-secondary-dark text-lg font-bold text-white disabled:bg-primary-two disabled:bg-opacity-80"
        disabled={isLoading || !watch("password")}
      >
        {isLoading ? "Loging in..." : "Login"}
      </Button>
      {isFailed && (
        <p className="text-center text-destructive">
          oops, something went wrong
        </p>
      )}
      <Separator className="my-2" />

      <Button
        type="button"
        className="bg-slate-800 text-lg font-bold hover:bg-slate-600"
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
      >
        <FillIcon.Google className="mr-3 fill-white" />
        Sign in with Google
      </Button>

      <p className="mt-2 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={"/signup"}
          className="font-bold text-tertiary-one underline"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LogInPage;

"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LogIn } from "@/app/(auth)/login/page";
import { useLogin } from "@/hooks/auth/useLogIn";
import { LogInFormSchema } from "@/lib/validations";

const AuthForm = () => {
  const form = useForm<LogIn>({ resolver: zodResolver(LogInFormSchema) });
  const { isFailed, isLoading, handleLogIn } = useLogin();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogIn)}
        className="auth-containers"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="p-6" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="p-6"
                  placeholder="enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-md mt-4 p-4 font-bold"
          disabled={isLoading}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;

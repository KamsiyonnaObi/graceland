"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordForm } from "@/hooks/auth/useForgotPasswordForm";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const { isLoading, isSuccess, form, onSubmit } = useForgotPasswordForm();

  return (
    <>
      <h2 className="text-2xl font-bold">Change Password</h2>

      {isSuccess ? (
        <div>
          <div className="mb-6 flex items-center">
            <CircleCheck className="mr-1" />
            <p>Your password has been successfully reset</p>
          </div>
          <Link
            className="block w-fit rounded-sm bg-secondary-two px-5 py-2 font-bold hover:bg-secondary-one"
            href={"/login"}
          >
            Return to sign in
          </Link>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-6 w-full font-bold"
              type="submit"
              disabled={
                isLoading ||
                !form.watch("password") ||
                form.watch("confirmPassword") !== form.watch("password")
              }
            >
              {isLoading ? "Please wait..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

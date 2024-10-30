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

export function ForgotPasswordForm() {
  const { isSuccess, form, onSubmit } = useForgotPasswordForm();

  return (
    <>
      <h2 className="text-2xl font-bold">Change Password</h2>

      {isSuccess ? (
        <>
          <CircleCheck />

          <p>Your Password has been successfully reset</p>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
              className="w-full font-bold"
              type="submit"
              disabled={
                !form.watch("password") ||
                form.watch("confirmPassword") !== form.watch("password")
              }
            >
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

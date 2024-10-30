"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePasswordRecovery } from "@/hooks/auth/usePasswordRecovery";

export function RecoverPasswordForm() {
  const { isSubmitted, toggleIsSubmitted, form, onSubmit, isLoading } =
    usePasswordRecovery();

  return (
    <>
      <h2 className="text-2xl font-bold">
        {isSubmitted ? "Please check your email." : "Recover Password"}
      </h2>

      {isSubmitted ? (
        <>
          <p>
            If an account with <strong>{form.getValues("email")} </strong>exists
            you should receive a link to reset your password
          </p>
          <p>
            If you do not see an email within 5 minutes, please check your spam
            folder.
          </p>
          <Button
            onClick={toggleIsSubmitted}
            className="w-full font-bold"
            type="button"
          >
            Resend Email
          </Button>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="someone@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    A secure reset password link will be sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full font-bold"
              type="submit"
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

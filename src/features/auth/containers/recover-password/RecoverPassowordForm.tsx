"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePasswordRecovery } from "@/hooks/auth/usePasswordRecovery";

export function RecoverPasswordForm({
  tokenExpired,
}: {
  tokenExpired?: boolean;
}) {
  const { isSubmitted, toggleIsSubmitted, form, onSubmit, isLoading } =
    usePasswordRecovery();

  return (
    <>
      {tokenExpired && (
        <h2 className="text-2xl font-bold">
          {isSubmitted ? "Please check your email." : "Your Token has expired"}
        </h2>
      )}
      {!tokenExpired && (
        <h2 className="text-2xl font-bold">
          {isSubmitted ? "Please check your email." : "Recover Password"}
        </h2>
      )}

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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {tokenExpired
                      ? "Please enter your email address below and we will send you a new link."
                      : "A secure reset password link will be sent to your email."}
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

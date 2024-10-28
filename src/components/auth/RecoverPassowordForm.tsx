"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().email(),
});

export function RecoverPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setIsSubmitted(true);
  }

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
            onClick={() => setIsSubmitted((prev) => !prev)}
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
            <Button className="w-full font-bold" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

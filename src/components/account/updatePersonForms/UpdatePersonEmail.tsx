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
import { Separator } from "@/components/ui/separator";

import { useUpdateEmail } from "@/hooks/profile/updateUserDetails/useUpdateEmail";

type UpdatePersonEmailProps = {
  email?: string;
};

const UpdatePersonEmail = ({ email }: UpdatePersonEmailProps) => {
  const { form, isEditing, setIsEditing, onSubmit, errors } = useUpdateEmail();
  return (
    <>
      {isEditing ? (
        <section className="flex flex-col gap-4">
          <div>
            <p className="font-bold">Current Email</p>
            <p>{email}</p>
          </div>
          <i className="text-sm">
            After changing your email, you will be redirected to sign in
          </i>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 lg:w-4/5"
            >
              <div className="flex w-full flex-col gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:w-4/5 lg:w-3/5">
                      <FormLabel>New Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem className="sm:w-4/5 lg:w-3/5">
                      <FormLabel>Confirm New Email</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="sm:w-4/5 lg:w-3/5">
                      <FormLabel>Account Password</FormLabel>
                      <FormControl>
                        <Input type="password" className="w-full" {...field} />
                      </FormControl>
                      <FormDescription>
                        For your security, please enter your password to verify
                        this change.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {errors.root?.serverError && (
                  <p className="text-sm font-medium text-red-600">
                    {errors.root.serverError.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  className="rounded-none"
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={form.watch("email") !== form.watch("confirmEmail")}
                  type="submit"
                  size="sm"
                  className="rounded-none px-4 font-bold"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </section>
      ) : (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p className="font-bold">Email</p>
            <p>{email}</p>
          </div>
          <Button
            className="font-bold"
            variant="link"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </>
  );
};

export default UpdatePersonEmail;

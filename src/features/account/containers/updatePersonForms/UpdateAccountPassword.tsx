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
import { useUpdatePassword } from "@/hooks/profile/updateUserDetails/useUpdatePassword";
import { Separator } from "@/components/ui/separator";

const UpdateAccountPassword = () => {
  const { form, isEditing, setIsEditing, onSubmit, errors } =
    useUpdatePassword();

  return (
    <>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 lg:w-4/5"
          >
            <div className="flex w-full flex-col gap-3">
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
              <Separator />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="sm:w-4/5 lg:w-3/5">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem className="sm:w-4/5 lg:w-3/5">
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="w-full" {...field} />
                    </FormControl>
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
                type="submit"
                size="sm"
                className="rounded-none px-4 font-bold"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p className="font-bold">Account Password</p>
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

export default UpdateAccountPassword;

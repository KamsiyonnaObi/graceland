"use client";
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

import { useUpdateName } from "@/hooks/profile/updateUserDetails/useUpdateName";

type UpdatePersonNameProps = {
  firstName: string;
  lastName: string | null;
};

const UpdatePersonName = ({ firstName, lastName }: UpdatePersonNameProps) => {
  const { form, isEditing, setIsEditing, onSubmit } = useUpdateName(
    firstName,
    lastName,
  );

  return (
    <>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 lg:w-4/5"
          >
            <div className="flex w-full gap-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
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
            <p className="font-bold">Name</p>
            <p>
              {firstName} {lastName}
            </p>
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

export default UpdatePersonName;

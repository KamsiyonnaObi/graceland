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
import { Separator } from "@/components/ui/separator";

import { useUpdatePhone } from "@/hooks/profile/updateUserDetails/useUpdatePhone";

type UpdatePersonPhoneNumberProps = {
  phoneNumber: string | null;
};

const UpdatePersonPhoneNumber = ({
  phoneNumber,
}: UpdatePersonPhoneNumberProps) => {
  const { form, isEditing, setIsEditing, onSubmit } =
    useUpdatePhone(phoneNumber);

  return (
    <>
      {isEditing ? (
        <>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 lg:w-4/5"
            >
              <div className="flex w-full gap-1">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Mobile</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-sm">
                            +234
                          </span>
                          <Input className="pl-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
        </>
      ) : (
        <div className="flex justify-between lg:w-3/5">
          <div>
            <p className="font-bold">Phone Number</p>
            <p>
              +234
              <span>{phoneNumber ? phoneNumber : " - Add a number"}</span>
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

export default UpdatePersonPhoneNumber;

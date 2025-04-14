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
import { useAddresses } from "@/hooks/profile/useAddresses";
import { Address } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type UpdateAddressFormProps = {
  address?: Address;
  onDelete?: (id: string) => Promise<void>;
  onSubmitComplete?: () => void;
  showForm?: boolean;
  onShowFormChange?: (show: boolean) => void;
};

const UpdateAddressForm = ({ 
  address, 
  onDelete, 
  onSubmitComplete,
  showForm = false,
  onShowFormChange
}: UpdateAddressFormProps) => {
  const { form, onSubmit, isLoading } = useAddresses(address);

  const handleSubmit = async (data: any) => {
    await onSubmit(data);
    onShowFormChange?.(false);
    onSubmitComplete?.();
  };

  const handleDelete = async () => {
    if (address && onDelete) {
      await onDelete(address.id);
    }
  };

  if (!showForm) {
    return (
      <Button
        onClick={() => onShowFormChange?.(true)}
        variant="link"
        className="font-bold"
      >
        <span style={{ marginRight: '8px', fontSize: '20px' }}>+</span>
        {address ? 'Edit Address' : 'Add New Address'}
      </Button>
    );
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="flex w-full flex-col gap-3">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[calc(33%-0.5rem)]">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter state" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[calc(33%-0.5rem)]">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-full sm:w-[calc(33%-0.5rem)]">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter zip code (optional)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.root?.serverError && (
            <p className="text-sm font-medium text-red-600">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          <div className="flex justify-between gap-2">
            {address && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Address
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onShowFormChange?.(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Address"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateAddressForm;

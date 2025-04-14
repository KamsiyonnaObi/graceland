import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Address } from "@prisma/client";

const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export const useAddresses = (initialAddress?: Address) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: initialAddress?.address || "",
      state: initialAddress?.state || "",
      country: initialAddress?.country || "",
      zipCode: initialAddress?.zipCode || "",
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/addresses", {
        method: initialAddress ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: initialAddress?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      setIsEditing(false);
      // You might want to add a success notification here
    } catch (error) {
      form.setError("root", {
        type: "serverError",
        message: "Failed to save address. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isEditing,
    setIsEditing,
    onSubmit,
    isLoading,
  };
}; 
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPhoneSchema } from "@/lib/validations";

import { toast } from "sonner";
import { updateUserPersonalDetails } from "@/server/actions/user.actions";

export const useUpdatePhone = (phoneNumber: string | null) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof editPhoneSchema>>({
    resolver: zodResolver(editPhoneSchema),
    defaultValues: {
      phoneNumber: phoneNumber || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editPhoneSchema>) => {
    try {
      const { success, error } = await updateUserPersonalDetails(
        values,
        "editPhone",
      );
      if (!success) {
        form.setError("phoneNumber", { type: "custom", message: error });
        toast.error("Error updating phone", {
          description: error,
          duration: 3000,
        });
        return;
      }
      toast.success("Your profile has been updated", { duration: 3000 });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile", {
        description: "something went wrong, please try again later",
        duration: 3000,
      });
    }
  };

  return { form, isEditing, setIsEditing, onSubmit };
};

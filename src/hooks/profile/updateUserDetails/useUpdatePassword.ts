import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordFormSchema } from "@/lib/validations";

import { toast } from "sonner";
import { updateUserPersonalDetails } from "@/server/actions/user.actions";

export const useUpdatePassword = () => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
  });
  const { errors } = form.formState;
  const onSubmit = async (values: z.infer<typeof ChangePasswordFormSchema>) => {
    try {
      const { success, error, status } = await updateUserPersonalDetails(
        values,
        "editPassword",
      );
      if (!success) {
        if (status === 401) {
          form.setError("password", { type: "custom", message: error });
        } else
          form.setError("root.serverError", { type: "custom", message: error });
        toast.error("Error updating password", {
          description: error,
          duration: 3000,
        });
        return;
      }

      toast.success("Your password has been updated", { duration: 3000 });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating password", {
        description: "something went wrong, please try again later",
        duration: 3000,
      });
    }
  };

  return { form, isEditing, setIsEditing, onSubmit, errors };
};

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editNameSchema } from "@/lib/validations";

import { toast } from "sonner";
import { updateUserPersonalDetails } from "@/server/actions/user.actions";

export const useUpdateName = (firstName: string, lastName: string | null) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof editNameSchema>>({
    resolver: zodResolver(editNameSchema),
    defaultValues: {
      firstName,
      lastName: lastName || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editNameSchema>) => {
    try {
      const { success, error } = await updateUserPersonalDetails(
        values,
        "editName",
      );
      if (!success) {
        form.setError("firstName", { type: "random", message: error });
        toast.error("Error updating profile", {
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

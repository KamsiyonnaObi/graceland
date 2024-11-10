import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editEmailSchema } from "@/lib/validations";

import { toast } from "sonner";
import { updateUserPersonalDetails } from "@/server/actions/user.actions";
import { signOut } from "next-auth/react";

export const useUpdateEmail = () => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof editEmailSchema>>({
    resolver: zodResolver(editEmailSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      password: "",
    },
  });
  const { errors } = form.formState;
  const onSubmit = async (values: z.infer<typeof editEmailSchema>) => {
    try {
      const { success, error, status } = await updateUserPersonalDetails(
        values,
        "editEmail",
      );
      if (!success) {
        if (status === 401) {
          form.setError("password", { type: "custom", message: error });
        } else
          form.setError("root.serverError", { type: "custom", message: error });
        toast.error("Error updating profile", {
          description: error,
          duration: 3000,
        });
        return;
      }
      signOut({ callbackUrl: "/login" });
      toast.success("Your email has been updated", { duration: 3000 });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile", {
        description: "something went wrong, please try again later",
        duration: 3000,
      });
    }
  };

  return { form, isEditing, setIsEditing, onSubmit, errors };
};

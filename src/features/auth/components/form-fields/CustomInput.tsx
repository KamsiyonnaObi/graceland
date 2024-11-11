import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authFormSchema } from "@/lib/validations/index";
import Link from "next/link";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  page?: "signin" | "signup";
  type?: string;
  placeholder: string;
}

const CustomInput = ({
  name,
  control,
  label,
  placeholder,
  page,
  type = "text",
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>{label}</FormLabel>
            {type === "password" && page === "signin" && (
              <Link href={"/recover-password"} className="text-xs underline">
                forgot password?
              </Link>
            )}
          </div>
          <FormControl>
            <Input
              type={type}
              className="p-6"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;

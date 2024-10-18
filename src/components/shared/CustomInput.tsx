import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { authFormSchema } from "@/lib/validations/index";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  type?: string;
  placeholder: string;
}

const CustomInput = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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

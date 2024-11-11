import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const TextInputField = ({
  formControl,
  name,
  label,
  placeholder,
  type = "text",
  prefix,
}: {
  formControl: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  prefix?: string;
}) => (
  <FormField
    control={formControl}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            {prefix && (
              <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-sm">
                {prefix}
              </span>
            )}
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={prefix ? "pl-11" : ""}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

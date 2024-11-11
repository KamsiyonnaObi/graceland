import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const RadioInputField = ({
  formControl,
  name,
  label,
  options,
}: {
  formControl: any;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) => (
  <FormField
    control={formControl}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
          >
            {options.map((option) => (
              <FormItem
                key={option.value}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <FormLabel className="font-normal">{option.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

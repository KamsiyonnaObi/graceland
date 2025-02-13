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
  label?: string;
  options: { value: string; label: string; subtext?: string }[];
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
                className="flex items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <div className="flex flex-col gap-2">
                  <FormLabel className="">{option.label}</FormLabel>
                  {option.subtext && (
                    <p className="text-sm">{option.subtext}</p>
                  )}
                </div>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

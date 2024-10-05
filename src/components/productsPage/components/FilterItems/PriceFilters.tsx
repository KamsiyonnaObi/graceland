"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useQueryString from "@/hooks/products/useQueryString";

const FormSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});
const PriceFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    },
  });

  const onFilterByPrice = (data: z.infer<typeof FormSchema>) => {
    if (!data.minPrice) {
      console.log("here", data);
      return;
    }
    router.push(pathname + "?" + createQueryString("minPrice", data.minPrice));
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="price">
        <AccordionTrigger className="text-sm font-bold">Price</AccordionTrigger>
        <AccordionContent className="px-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFilterByPrice)}
              className="space-y-6"
            >
              <div className="flex items-center justify-between gap-2">
                <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 transform">
                            ₦
                          </span>
                          <Input
                            className="rounded-none pl-5"
                            type="number"
                            min={0}
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Max</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 transform">
                            ₦
                          </span>
                          <Input
                            type="number"
                            className="rounded-none pl-5"
                            min={0}
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={!form.watch("minPrice") && !form.watch("maxPrice")}
                className="w-full rounded-none bg-secondary-two text-black"
                type="submit"
              >
                Apply Price Change
              </Button>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceFilters;
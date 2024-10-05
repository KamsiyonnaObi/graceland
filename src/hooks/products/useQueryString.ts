import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PriceFilterFormSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
});

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof PriceFilterFormSchema>>({
    resolver: zodResolver(PriceFilterFormSchema),
    defaultValues: {
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    },
  });

  const onFilterByPrice = useCallback(
    (data: z.infer<typeof PriceFilterFormSchema>) => {
      const params = new URLSearchParams(searchParams.toString());

      const minPriceValue = Number(data.minPrice);
      const maxPriceValue = Number(data.maxPrice);

      if (!isNaN(minPriceValue) && minPriceValue > 0) {
        params.set("minPrice", data.minPrice!);
      } else {
        params.delete("minPrice");
      }

      if (!isNaN(maxPriceValue) && maxPriceValue > 0) {
        params.set("maxPrice", data.maxPrice!);
      } else {
        params.delete("maxPrice");
      }

      router.push("?" + params.toString());
    },
    [router, searchParams],
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const updateQueryString = (newParams: URLSearchParams) => {
    router.push(pathname + "?" + newParams.toString());
  };

  const handleCheckboxChange = (filterName: string, optionId: string) => {
    // Get the current filter values from the URL
    const params = new URLSearchParams(searchParams.toString());
    const existingValues = params.getAll(filterName);

    if (existingValues.includes(optionId)) {
      // If the checkbox is already selected, remove it
      params.delete(filterName);
      existingValues.forEach((value) => {
        if (value !== optionId) {
          params.append(filterName, value);
        }
      });
    } else {
      // If the checkbox is not selected, add it
      params.append(filterName, optionId);
    }

    // Update the URL with the new filter values
    router.push(pathname + "?" + params.toString());
  };
  return {
    form,
    onFilterByPrice,
    createQueryString,
    updateQueryString,
    handleCheckboxChange,
    searchParams,
  };
};

export default useQueryString;

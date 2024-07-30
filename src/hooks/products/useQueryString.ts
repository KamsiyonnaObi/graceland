import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    createQueryString,
    updateQueryString,
    handleCheckboxChange,
    searchParams,
  };
};

export default useQueryString;

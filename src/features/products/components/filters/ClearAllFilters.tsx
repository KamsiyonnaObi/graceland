"use client";
import { Button } from "@/components/ui/button";
import useQueryString from "@/hooks/products/useQueryString";

const ClearAllFilters = () => {
  const { clearAllFilters } = useQueryString();
  return (
    <Button className="px-0" variant="link" onClick={clearAllFilters}>
      clear all filters
    </Button>
  );
};

export default ClearAllFilters;

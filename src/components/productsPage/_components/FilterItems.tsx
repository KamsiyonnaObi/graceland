"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { filterOptions, sortOptions } from "@/constants";
import useQueryString from "@/hooks/products/useQueryString";

export function RadioGroupFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();

  return (
    <section>
      <h6 className="mb-1 font-bold">Sort by</h6>
      <RadioGroup
        defaultValue="new-arrivals"
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
      >
        {sortOptions.map((option) => (
        
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
}

export function CheckboxFilters() {
  const { handleCheckboxChange, searchParams } = useQueryString();
  return (
    <>
      {filterOptions.map((filter, index) => (
        <div key={index}>
          <h6 className="mb-1 font-bold">{filter.heading}</h6>
          {filter.options.map((option) => (
            <div key={option.id}>
              <Checkbox
                id={option.id}
                onCheckedChange={() =>
                  handleCheckboxChange(filter.heading.toLowerCase(), option.id)
                }
                checked={searchParams
                  .getAll(filter.heading.toLowerCase())
                  .includes(option.id)}
              />
              <label
                htmlFor={option.id}
                className="ml-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

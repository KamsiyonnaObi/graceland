"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h6 className="mb-1 text-sm font-bold">Sort</h6>
        </AccordionTrigger>
        <AccordionContent>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function CheckboxFilters() {
  const { handleCheckboxChange, searchParams } = useQueryString();
  return (
    <Accordion type="single" collapsible>
      {filterOptions.map((filter) => {
        return (
          <AccordionItem key={filter.heading} value={filter.heading}>
            <AccordionTrigger className="text-sm font-bold">
              {filter.heading}
            </AccordionTrigger>
            <AccordionContent>
              {filter.options.map((option) => (
                <div key={option.id}>
                  <Checkbox
                    id={option.id}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        filter.heading.toLowerCase(),
                        option.id,
                      )
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
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { filterOptions } from "@/constants";
import useQueryString from "@/hooks/products/useQueryString";

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

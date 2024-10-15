"use client";
import { Info, ArrowUpRight } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CustomerSurvey = () => {
  return (
    <div className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-slate-100 p-2">
      <Popover>
        <PopoverTrigger>
          <Info className="h-8 w-8" />
        </PopoverTrigger>
        <PopoverContent className="mb-2 mr-6 min-w-[425px]">
          <a
            className="flex justify-between"
            href="https://forms.office.com/r/HXZJy4Uu2k"
            target="_blank"
          >
            <h3 className="mb-2 font-bold">Please fill out our survey!</h3>
            <ArrowUpRight />
          </a>
          <p className="text-sm text-slate-600">
            Thank you for using the Graceland e-commerce app! We value your
            feedback as we work to improve our platform. Please take a few
            moments to let us know about your experience.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerSurvey;

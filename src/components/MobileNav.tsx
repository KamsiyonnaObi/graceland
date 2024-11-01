"use client";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { Menu } from "lucide-react";
import { NavLink } from "./Nav";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-4/5 sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-2xl font-bold">Graceland</h1>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-5 flex flex-col">
          {navLinks.map((nav) => {
            return (
              <NavLink key={nav.label} href={nav.href}>
                <SheetClose>{nav.label}</SheetClose>
              </NavLink>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

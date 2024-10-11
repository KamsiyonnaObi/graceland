"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "xl:padding-x wide:padding-x z-10 mx-auto w-full bg-secondary-one",
        pathname === "/" && "absolute bg-transparent",
      )}
    >
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "rounded-lg p-2 hover:bg-accent focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "font-bold text-foreground",
      )}
    />
  );
}

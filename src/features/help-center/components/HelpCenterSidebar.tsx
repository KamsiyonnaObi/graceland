"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface HelpCenterSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function HelpCenterSidebar({
  className,
  items,
  ...props
}: HelpCenterSidebarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            pathname === item.href
              ? "bg-muted font-semibold hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start rounded-lg p-2 text-blue-800",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

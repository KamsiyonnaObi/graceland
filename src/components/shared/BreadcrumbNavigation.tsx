import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface BreadcrumbLinks {
  label: string;
  href: string;
}
interface BreadcrumbNavigationProps {
  breadcrumbLinks: BreadcrumbLinks[];
}
export function BreadcrumbNavigation({
  breadcrumbLinks = [{ label: "Shop", href: "/shop" }],
}: BreadcrumbNavigationProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbLinks.length > 0 &&
          breadcrumbLinks.map((link, index) => {
            if (index !== breadcrumbLinks.length - 1) {
              return (
                <React.Fragment key={link.label}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              );
            }
          })}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {breadcrumbLinks[breadcrumbLinks.length - 1].label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

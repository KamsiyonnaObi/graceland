"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryFilterListProps {
  categoryName: string;
  categorySlug: string;
}
export default function CategoryFilterList({
  categoryName,
  categorySlug,
}: CategoryFilterListProps) {
  const pathname = usePathname();
  const basePath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const nextHref = `${basePath}/${categorySlug}`;
  return (
    <Link href={nextHref} className="block px-2 py-2 hover:underline">
      {categoryName}
    </Link>
  );
}

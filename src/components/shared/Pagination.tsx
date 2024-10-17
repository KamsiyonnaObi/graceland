"use client";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";

import { generatePagination, modifySearchParams } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationComponent({ totalPages }: { totalPages: number }) {
  const searchParams = Object.fromEntries(useSearchParams()) as any;

  const router = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.page) || 1;

  const handlePageChange = (newPage: number) => {
    const query = modifySearchParams(searchParams, {
      ...searchParams,
      page: newPage,
    });
    router.push(`${pathname}?${query}`);
  };
  const paginationNumbers = generatePagination(page, totalPages);
  return (
    <div
      className={`${totalPages === 0 && "hidden"} mt-4 flex items-center justify-center gap-4`}
    >
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        variant="ghost"
      >
        <ChevronLeft className="h-5 text-black" />
      </Button>
      {paginationNumbers.map((item) => (
        <p key={item} className={`${item === page ? "text-lg font-bold" : ""}`}>
          {item}
        </p>
      ))}
      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        variant="ghost"
      >
        <ChevronRight className="h-5 text-black" />
      </Button>
    </div>
  );
}

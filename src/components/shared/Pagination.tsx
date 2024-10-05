"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { generatePagination, modifySearchParams } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationComponent({ totalPages }: { totalPages: number }) {
  const searchParams = Object.fromEntries(useSearchParams()) as any;

  const router = useRouter();
  const page = parseInt(searchParams.page) || 1;

  const handlePageChange = (newPage: number) => {
    const query = modifySearchParams(searchParams, {
      ...searchParams,
      page: newPage,
    });
    router.push(`/products?${query}`);
  };
  const paginationNumbers = generatePagination(page, totalPages);
  return (
    <div
      className={`${totalPages === 0 && "hidden"} flex items-center justify-center gap-4`}
    >
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="text-white"
      >
        <ChevronLeft />
      </Button>
      {paginationNumbers.map((item) => (
        <p key={item} className={`${item === page ? "text-lg font-bold" : ""}`}>
          {item}
        </p>
      ))}
      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="text-white"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

import { Suspense } from "react";
import { notFound } from "next/navigation";

import Filter from "@/components/productsPage/Filter";
import { getAllProducts } from "@/app/admin/_actions/products";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";

import db from "@/db/db";
import { cache } from "@/lib/cache";
import { getSortOptions } from "@/utils/productFilterHelpers";
import { PaginationComponent } from "@/components/shared/Pagination";

const getProducts = cache(
  (sort: "asc" | "desc" = "desc") => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { priceInCents: sort },
    });
  },
  ["/products", "getProducts"],
);

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let _options = getSortOptions({ searchParams });
  const page = parseInt(searchParams.page) || 1;
  const options = { ..._options, page };
  const { totalPages } = await getAllProducts(options);

  return (
    <div className="page-container">
      <section>
        <h1 className="font-palanquin text-3xl font-bold">All Products</h1>
      </section>
      <section className="flex gap-[60px]">
        <div className="flex w-[300px] p-4 max-lg:hidden">
          <Filter />
        </div>
        <div>
          <div className="grid min-h-[60vh] w-full grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:border-l">
            <Suspense fallback={<LoadingSkeletons count={6} />}>
              <ProductsSuspense options={options} />
            </Suspense>
          </div>
          <PaginationComponent totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}

// Component to display loading skeletons while data is loading
function LoadingSkeletons({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
}

async function ProductsSuspense({
  options,
}: {
  options: {
    sortField: string;
    sortOrder: "asc" | "desc" | "new";
    page: number;
  };
}) {
  const { products } = await getAllProducts(options);

  if (!products) {
    return notFound();
  }
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

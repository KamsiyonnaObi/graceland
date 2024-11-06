import { Suspense } from "react";

import Filter from "@/components/productsPage/Filter";
import { getAllProducts } from "@/server/actions/products";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";

import { getSortOptions } from "@/utils/productFilterHelpers";
import { PaginationComponent } from "@/components/shared/Pagination";
import { SortByFilters } from "@/components/productsPage/components/FilterItems/SortByFilters";
import MobileFilters from "@/components/productsPage/MobileFilters";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let _options = getSortOptions({ searchParams });
  const page = parseInt(searchParams.page) || 1;
  const options = { ...searchParams, ..._options, page };
  const { totalPages } = await getAllProducts(options);

  return (
    <div className="page-container">
      <div className="flex justify-between">
        <h1 className="font-palanquin text-3xl font-bold">All Products</h1>
        <div className="max-lg:hidden">
          <SortByFilters />
        </div>
        <MobileFilters />
      </div>
      <div className="flex">
        <section className="flex w-1/5 max-lg:hidden">
          <Filter />
        </section>
        <section className="mx-auto w-full lg:w-4/5">
          <div className="grid min-h-[60vh] w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <Suspense fallback={<LoadingSkeletons count={6} />}>
              <ProductsSuspense options={options} />
            </Suspense>
          </div>
          <PaginationComponent totalPages={totalPages} />
        </section>
      </div>
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
    page: number;
  };
}) {
  const { products } = await getAllProducts(options);

  if (products.length < 1) {
    return <p>no products found</p>;
  }
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

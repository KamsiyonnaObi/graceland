import { Suspense } from "react";
import { getAllProducts } from "@/server/actions/products";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/ProductCard";
import { PaginationComponent } from "@/components/shared/Pagination";
import { getSortOptions } from "@/utils/productFilterHelpers";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let _options = getSortOptions({ searchParams });
  const page = parseInt(searchParams.page) || 1;
  const options = { ...searchParams, ..._options, page };
  const { products, totalPages } = await getAllProducts(options);

  return (
    <>
      <div className="mb-4 px-2 md:px-6">
        <h1 className="hero-title">Shop all Products</h1>
        <p className="hero-description">
          Best selling Baby products in Lagos, Nigeria
        </p>
      </div>
      <div className="grid min-h-[60vh] w-full grid-cols-2 gap-6 md:grid-cols-3">
        <Suspense fallback={<LoadingSkeletons count={6} />}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={
                  product.slug ??
                  product.name.toLowerCase().replace(/\s+/g, "-")
                }
                priceInCents={product.priceInCents}
                description={product.description}
                imagePath={product.imagePath}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </Suspense>
      </div>
      <PaginationComponent totalPages={totalPages} />
    </>
  );
}

// Loading skeletons for suspense fallback
function LoadingSkeletons({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
}

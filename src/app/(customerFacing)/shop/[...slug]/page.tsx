import { Suspense } from "react";
import { getAllProducts } from "@/server/actions/products";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/ProductCard";

import { getSortOptions } from "@/utils/productFilterHelpers";
import { PaginationComponent } from "@/components/shared/Pagination";
import { getCategoryBySlug } from "@/server/actions/category.actions";
import NoProductsFoundCard from "@/features/products/components/not-found/NoProductsFoundCard";
import PriceFilters from "@/features/products/components/filters/price/PriceFilters";
import CategoryFilters from "@/features/products/containers/filters/CategoryFilters";

export default async function ProductsPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { slug: string[] };
}) {
  let _options = getSortOptions({ searchParams });
  const page = parseInt(searchParams.page) || 1;
  const options = { ...searchParams, ..._options, category: params.slug, page };
  const { totalPages } = await getAllProducts(options);

  const slug = params.slug?.[0];
  let categoryName = "All Products";
  const categoryNum = params.slug?.length ?? 0;
  const categorySlug = params.slug[categoryNum - 1];

  if (slug) {
    const category = await getCategoryBySlug(slug);
    if (category) {
      categoryName = category.name;
    }
  }

  const title = `${categoryName}`;
  const description = `Discover best selling Baby ${categoryName} in Lagos, Nigeria.`;
  return (
    <>
      <aside className="flex w-1/5 flex-col border-r max-lg:hidden">
        <CategoryFilters categorySlug={categorySlug} />
        <PriceFilters />
      </aside>
      <section>
        <div className="mb-4 px-2 md:px-6">
          <h1 className="hero-title">{title} </h1>
          <p className="hero-description">{description}</p>
        </div>
        <div className="grid min-h-[60vh] w-full grid-cols-2 gap-6 md:grid-cols-3">
          <Suspense fallback={<LoadingSkeletons count={6} />}>
            <ProductsSuspense options={options} />
          </Suspense>
        </div>
        <PaginationComponent totalPages={totalPages} />
      </section>
    </>
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
    return <NoProductsFoundCard />;
  }
  return products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      slug={product.slug ?? product.name.toLowerCase().replace(/\s+/g, "-")}
      priceInCents={product.priceInCents}
      description={product.description}
      imagePath={product.imagePath}
    />
  ));
}

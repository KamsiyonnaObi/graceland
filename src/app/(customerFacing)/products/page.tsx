import { getAllProducts } from "@/app/admin/_actions/products";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import Filter from "@/components/productsPage/Filter";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const getProducts = cache((sort: "asc" | "desc" = "desc") => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: {priceInCents :sort},
  });
}, ["/products", "getProducts"]);

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sort = (searchParams.sort as "asc" | "desc") || "desc";
  return (
    <div className="page-container">
      <section>
        <h1 className="font-palanquin text-3xl font-bold">All Products</h1>
      </section>
      <section className="flex gap-[60px]">
        <div className="flex w-[300px] p-4">
          <Filter />
        </div>
        <div className="grid w-full grid-cols-1 content-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductsSuspense sort={sort}/>
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function ProductsSuspense({ sort }: { sort: "asc" | "desc" }) {
  const products = await getAllProducts({sort});

  if (!products) {
    return notFound();
  }
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

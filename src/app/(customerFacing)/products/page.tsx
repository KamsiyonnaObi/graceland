import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import Filter from "@/components/productsPage/Filter";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "desc" },
  });
}, ["/products", "getProducts"]);

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
            <ProductsSuspense />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();

  console.log("all products: ", products);
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}

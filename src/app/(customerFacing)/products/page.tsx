import { getAllProducts } from "@/app/admin/_actions/products";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import Filter from "@/components/productsPage/Filter";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { notFound } from "next/navigation";
import { JSX, Suspense } from "react";

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


let sortValues  = Object.values(searchParams)

//key map
const sortKeyMap: { [key: string]: string } = {
  "new": "createdAt",
  "asc": "priceInCents",
  "desc": "priceInCents",
};


  const sortField =  sortKeyMap[sortValues[0] as string]
  const sortOrder = (sortValues[0]  as "asc" | "desc" | "new") || "desc";
  const options = { sortField, sortOrder }; // Prepare the object with field and order

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
            <ProductsSuspense options={options} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function ProductsSuspense({ options }: { options: { sortField: string, sortOrder: "asc" | "desc" | "new" } }) {

  if(options.sortOrder == 'new'){
    options.sortField = 'createdAt'
    options.sortOrder = 'desc'
  }

  const products = await getAllProducts(options);

  if (!products) {
    return notFound();
  }
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
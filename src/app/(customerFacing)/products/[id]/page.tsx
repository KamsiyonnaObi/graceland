import Image from "next/image";
import { notFound } from "next/navigation";

import db from "@/server/db/db";
import { formatCurrency } from "@/lib/formatters";

import BackButton from "@/components/BackButton";
import AddToCart from "@/components/productsPage/components/AddToCartButton";

const ProductDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) return notFound();
  return (
    <div className="page-container">
      <BackButton />

      <div className="flex gap-12 lg:justify-center lg:gap-4">
        <section className="lg:w-1/2">
          <div className="relative h-[420px] w-[420px] rounded-md max-lg:hidden">
            <Image
              src={product.imagePath}
              alt={product.name}
              className="object-contain p-5"
              fill
            />
          </div>
          {product.description && (
            <div className="max-lg:hidden">
              <h3 className="mb-2 text-lg font-bold">Overview</h3>
              <p className="line-clamp-6">{product.description}</p>
            </div>
          )}
        </section>

        <section className="flex min-w-[300px] flex-col gap-6 px-4 lg:w-1/2">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="relative mx-auto h-[420px] w-full rounded-md lg:hidden">
            <Image
              src={product.imagePath}
              alt={product.name}
              className="object-contain p-5"
              fill
            />
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(product.priceInCents / 100)}
          </p>

          <div>
            <AddToCart
              productId={product.id}
              productName={product.name}
              price={product.priceInCents}
              imagePath={product.imagePath}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;

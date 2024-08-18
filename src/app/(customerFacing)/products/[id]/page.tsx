import Image from "next/image";
import { notFound } from "next/navigation";

import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";

import BackButton from "@/components/BackButton";
import AddToCart from "@/components/productsPage/_components/AddToCartButton";

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

      <div className="flex justify-center gap-12">
        <div className="relative h-[420px] w-[420px] rounded-md">
          <Image
            src={product.imagePath}
            alt={product.name}
            className="object-contain p-5"
            fill
          />
        </div>
        <div className="flex min-w-[300px] flex-col justify-center gap-6 px-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p>{product.description}</p>
          <p className="font-bold">
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

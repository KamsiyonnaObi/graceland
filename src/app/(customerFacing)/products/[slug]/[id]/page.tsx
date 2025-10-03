import { notFound } from "next/navigation";
import { ImageCarousel } from "@/features/products/components/products-page/ImageCarousel";

import { formatCurrency } from "@/lib/formatters";
import { getProduct } from "@/server/actions/products";
import AddToCartContainer from "@/features/products/containers/products-page/AddToCart.container";

const ProductDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { product } = await getProduct(id);

  if (product == null) return notFound();
  return (
    <div className="page-container max-w-[1440px] lg:min-h-fit">
      <div className="grid lg:grid-cols-5">
        <section className="mx-auto aspect-square max-w-[350px] rounded-lg shadow-lg md:max-w-[500px] lg:col-span-3 lg:max-w-[400px] xl:max-w-[500px]">
          <ImageCarousel productName={product.name} images={product.images} />
        </section>
        <section className="space-y-2 px-4 lg:col-span-2">
          <h2 className="text-lg font-bold max-lg:pt-4">{product.name}</h2>
          <p className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </p>
          <section className="flex flex-col py-4 lg:justify-center lg:py-6">
            <AddToCartContainer
              productId={product.id}
              productName={product.name}
              price={product.priceInCents}
              imagePath={product.imagePath}
            />
          </section>
          {product.description && (
            <div className="py-3 lg:py-6">
              <h4 className="mb-3 text-xl font-bold">Overview</h4>
              <p className="">{product.description}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;

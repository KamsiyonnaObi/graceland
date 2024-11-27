import { notFound } from "next/navigation";

import AddToCart from "@/features/products/components/AddToCartButton";
import { ImageCarousel } from "@/features/products/components/products-page/ImageCarousel";

import { formatCurrency } from "@/lib/formatters";
import { getProduct } from "@/server/actions/products";

const ProductDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { product } = await getProduct(id);

  if (product == null) return notFound();
  return (
    <div className="page-container max-w-[1440px] lg:min-h-fit">
      {/* <BackButton /> */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Info Section */}
        <section className="space-y-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.description && (
            <div className="">
              <p className="">{product.description}</p>
            </div>
          )}
        </section>

        {/* Image Carousel */}
        <section className="flex-center">
          <ImageCarousel productName={product.name} images={product.Image} />
        </section>

        {/* Add To Cart Section */}
        <section className="flex flex-col gap-4 lg:justify-center">
          <p className="text-xl font-bold">
            From {formatCurrency(product.priceInCents / 100)}
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

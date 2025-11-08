import type { Metadata } from "next";
import { getCategoryBySlug } from "@/server/actions/category.actions";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params.slug?.[0];
  let categoryName = "All Products";
  if (slug) {
    const category = await getCategoryBySlug(slug);
    categoryName = category?.name ?? "All Products";
  }

  const title = `${categoryName} - Graceland Baby Products`;
  const description = `Browse ${categoryName} and discover best selling baby products in Lagos, Nigeria.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/shop/${params.slug?.join("/") ?? ""}`,
      siteName: "Graceland Baby Products",
    },
  };
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

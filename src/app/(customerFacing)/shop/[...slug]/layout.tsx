import type { Metadata } from "next";
import { getCategoryBySlug } from "@/server/actions/category.actions";

const BASE_URL = process.env.BASE_URL || "https://www.gracelandng.com";

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
  const path = `/shop/${params.slug?.join("/") ?? ""}`;
  const canonical = `${BASE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Graceland Baby Products",
    },
    alternates: {
      canonical,
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

import { SortByFilters } from "@/features/products/components/filters/sort/SortByFilters";
import MobileFilters from "@/features/products/components/MobileFilters";

export const metadata = {
  title: "All Products - Graceland Baby Products",
  description:
    "Browse all products and discover best selling baby products in Lagos, Nigeria.",
  openGraph: {
    title: "All Products - Graceland Baby Products",
    description:
      "Browse all products and discover best selling baby products in Lagos, Nigeria.",
    url: "/shop",
    siteName: "Graceland Baby Products",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-container">
      <div className="mb-2 flex items-center justify-end">
        <div className="max-lg:hidden">
          <SortByFilters />
        </div>
        <MobileFilters />
      </div>
      <div className="flex">{children}</div>
    </div>
  );
}

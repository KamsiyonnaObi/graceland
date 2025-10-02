import { ProductCategoryType } from "@/types";

export function generateProductUrl(
  slug: string,
  category: ProductCategoryType | null,
): string {
  const segments: string[] = [];

  let currentCategory = category;
  while (currentCategory) {
    segments.unshift(currentCategory.slug);
    currentCategory = currentCategory.parentCategory ?? null;
  }

  segments.push(slug);

  return `/shop/${segments.join("/")}`;
}

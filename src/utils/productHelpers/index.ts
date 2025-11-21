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

export function formatCategoryName(slug: string): string {
  // Replace hyphens/underscores with spaces and capitalize each word
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

import db from "@/server/db/db";
import { redirect } from "next/navigation";

export async function getCategoryBySlug(slug: string) {
  try {
    return await db.category.findUnique({
      where: { slug },
      select: { name: true, slug: true },
    });
  } catch (error) {
    console.error(`Error fetching category by slug '${slug}':`, error);
    return null;
  }
}

export async function getSubcategories(parentSlug?: string) {
  try {
    if (parentSlug) {
      const parent = await db.category.findUnique({
        where: { slug: parentSlug },
      });

      if (!parent) redirect("/shop");
      return db.category.findMany({ where: { parentCategoryId: parent.id } });
    }
    // Top-level categories
    return db.category.findMany({
      where: { parentCategoryId: null },
      select: { name: true, slug: true },
    });
  } catch (error) {
    console.error("Error fetching sub category by slug", error);
    return [];
  }
}

import db from "@/server/db/db";

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

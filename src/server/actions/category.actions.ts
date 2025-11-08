import db from "@/server/db/db";

type CategoryDto = { name: string; slug: string };
type Result<T> = { data: T | null; error: string | null };

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

export async function getSubcategories(
  parentSlug?: string,
): Promise<Result<CategoryDto[]>> {
  try {
    const slug = parentSlug ? parentSlug.trim().toLowerCase() : undefined;

    if (!slug) {
      const topLevelCategories = await db.category.findMany({
        where: { parentCategoryId: null },
        select: { name: true, slug: true },
      });

      return { data: topLevelCategories, error: null };
    }

    const parentCategory = await db.category.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!parentCategory) {
      return {
        data: [],
        error: `Parent category with slug "${slug}" not found`,
      };
    }

    const subCategories = await db.category.findMany({
      where: { parentCategoryId: parentCategory.id },
      select: { name: true, slug: true },
    });

    return { data: subCategories, error: null };
  } catch (err) {
    console.error("Error fetching subcategories", err);
    return { data: [], error: "Internal server error" };
  }
}

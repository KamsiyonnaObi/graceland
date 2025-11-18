import { getSubcategories } from "@/server/actions/category.actions";
import { getAllProductSlugs } from "@/server/actions/products";
import { MetadataRoute } from "next";

// Update these lists/logic as your app changes.
function getAllAppRoutes(): string[] {
  return ["", "shop", "help-center", "refund-policy"];
}

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

function getChangeFrequency(route: string): ChangeFrequency {
  if (route === "" || route === "home") return "daily";
  if (route.startsWith("product") || route === "shop") return "daily";
  if (route.startsWith("category")) return "weekly";
  return "monthly";
}

function getRoutePriority(route: string): number {
  if (route === "" || route === "home") return 1.0;
  if (route.startsWith("product")) return 0.8;
  if (route.startsWith("category")) return 0.7;
  if (route === "shop") return 0.6;
  return 0.5;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || "https://www.gracelandng.com/";

  // static routes (like home, about, contact, etc.)
  const appRoutes = getAllAppRoutes();
  const staticRoutes: MetadataRoute.Sitemap = appRoutes.map((route) => ({
    url: route === "" ? baseUrl : `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(route),
    priority: getRoutePriority(route),
  }));

  const productSlugs = await getAllProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((p) => ({
    url: `${baseUrl}product/${p.slug}/${p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const { data: categories } = await getSubcategories();
  if (categories == null) return [];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/shop/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}

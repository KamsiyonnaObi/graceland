"use server";
import db from "@/server/db/db";
import { validateSortParams } from "@/utils/productFilterHelpers";

interface GetAllProductsParams {
  name?: string;
  category?: string[];
  minPrice?: string;
  maxPrice?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
}

export async function getAllProducts(params: GetAllProductsParams) {
  let { sortField, sortOrder, name, category, minPrice, maxPrice, page } =
    params;
  sortField = sortField || "priceInCents";
  sortOrder = sortOrder || "desc";
  page = Math.max(1, page || 1); // Ensure page is at least 1

  const { sortField: validatedSortField, sortOrder: validatedSortOrder } =
    validateSortParams(sortField, sortOrder);

  const resultsPerPage = 25;

  // prepare prisma where condition
  const filterConditions: any = {
    isAvailableForPurchase: true,
  };

  if (name) {
    filterConditions.name = { contains: name, mode: "insensitive" };
  }

  if (category && category.length > 0) {
    filterConditions.category = {
      slug: { in: category },
    };
  }

  const parsedMinPrice = parseFloat(minPrice || "0");
  const parsedMaxPrice = parseFloat(maxPrice || "0");

  if (!isNaN(parsedMinPrice) && parsedMinPrice > 0) {
    filterConditions.priceInCents = {
      ...filterConditions.priceInCents,
      gte: parsedMinPrice * 100,
    };
  }

  if (!isNaN(parsedMaxPrice) && parsedMaxPrice > 0) {
    filterConditions.priceInCents = {
      ...filterConditions.priceInCents,
      lte: parsedMaxPrice * 100,
    };
  }

  try {
    const totalRecords = await db.product.count({ where: filterConditions });
    const totalPages = Math.ceil(totalRecords / resultsPerPage);
    const skip = (page - 1) * resultsPerPage;

    const products = await db.product.findMany({
      where: filterConditions,
      orderBy: { [validatedSortField]: validatedSortOrder },
      skip,
      take: resultsPerPage,
      include: {
        category: {
          include: {
            parentCategory: {
              include: {
                parentCategory: true,
              },
            },
          },
        },
      },
    });

    return { products, totalPages };
  } catch (error) {
    console.error(`failed to fetch products - ${error}`);
    return { error: "Failed to fetch products.", products: [], totalPages: 0 };
  }
}

export async function getProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
      select: {
        id: true,
        imagePath: true,
        description: true,
        name: true,
        priceInCents: true,
        images: { select: { id: true, url: true } },
        category: { select: { name: true, slug: true } },
      },
    });
    return { error: null, product };
  } catch (error) {
    console.error(`failed to fetch product id ${id} - ${error}`);
    return { error: "Failed to fetch product.", product: null };
  }
}

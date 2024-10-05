"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { addSchema, fileSchema, imageSchema } from "@/lib/validations";
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

  if (category) {
    filterConditions.category = {
      hasSome: Array.isArray(category) ? category : [category],
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
    });

    return { products, totalPages };
  } catch (error) {
    console.error(`failed to fetch products - ${error}`);
    return { error: "Failed to fetch products.", products: [], totalPages: 0 };
  }
}

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    toast.error("Failed to create product");
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("products", { recursive: true });

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer()),
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer()),
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

  await fs.unlink(`public${product.imagePath}`);

  revalidatePath("/");
  revalidatePath("/products");
}

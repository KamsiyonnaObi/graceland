"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { addSchema, fileSchema, imageSchema } from "@/lib/validations";

export async function getAllProducts({
  sortField = "priceInCents",
  sortOrder = "desc",
  name,
  category,
  minPrice,
  maxPrice,
  page = 1,
}: {
  name?: string;
  category?: string[];
  minPrice?: string;
  maxPrice?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc" | "new";
  page: number;
}) {
  const resultsPerPage = 25;
  const totalRecords = await db.product.count();
  const totalPages = Math.ceil(totalRecords / resultsPerPage);
  const skip = (page - 1) * resultsPerPage;
  try {
    const products = await db.product.findMany({
      where: {
        isAvailableForPurchase: true,
        name: { contains: name, mode: "insensitive" },
        ...(category && {
          category: {
            hasSome: Array.isArray(category) ? category : [category],
          },
        }),
        ...(minPrice && { priceInCents: { gte: parseInt(minPrice) * 100 } }),
        ...(maxPrice && { priceInCents: { gte: parseInt(maxPrice) * 100 } }),
      },
      orderBy: { [sortField]: sortOrder },
      skip,
      take: resultsPerPage,
    });
    revalidatePath("/products");
    return { products, totalPages };
  } catch (error) {
    console.error(`failed to fetch products - ${error}`);
    let products: any[] = [];
    let totalPages = 0;

    return { products, totalPages };
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

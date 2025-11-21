import { generateProductUrl } from "./index";
import { ProductCategoryType } from "@/types";

describe("generateProductUrl", () => {
  it("generates URL with single category", () => {
    const category: ProductCategoryType = {
      id: "1",
      name: "Car Seats",
      slug: "car-seats",
      parentCategoryId: null,
      parentCategory: null,
    };
    expect(generateProductUrl("4ever-dlx-4-in-1-car-seat", category)).toBe(
      "/shop/car-seats/4ever-dlx-4-in-1-car-seat",
    );
  });

  it("generates URL with nested categories", () => {
    const category: ProductCategoryType = {
      id: "3",
      name: "All-in-One Car Seats",
      slug: "all-in-one-car-seats",
      parentCategoryId: "2",
      parentCategory: {
        id: "2",
        name: "Toddler Car Seats",
        slug: "toddler-car-seats",
        parentCategoryId: "1",
        parentCategory: {
          id: "1",
          name: "Car Seats",
          slug: "car-seats",
          parentCategoryId: null,
          parentCategory: null,
        },
      },
    };
    expect(generateProductUrl("4ever-dlx-4-in-1-car-seat", category)).toBe(
      "/shop/car-seats/toddler-car-seats/all-in-one-car-seats/4ever-dlx-4-in-1-car-seat",
    );
  });

  it("generates URL with no category", () => {
    expect(generateProductUrl("just-a-product", null)).toBe(
      "/shop/just-a-product",
    );
  });

  it("handles category with missing parentCategory property", () => {
    const category: ProductCategoryType = {
      id: "1",
      name: "Car Seats",
      slug: "car-seats",
      parentCategoryId: null,
      // parentCategory is undefined
    };
    expect(generateProductUrl("slug", category)).toBe("/shop/car-seats/slug");
  });

  it("handles empty slug", () => {
    const category: ProductCategoryType = {
      id: "1",
      name: "Car Seats",
      slug: "car-seats",
      parentCategoryId: null,
      parentCategory: null,
    };
    expect(generateProductUrl("", category)).toBe("/shop/car-seats/");
  });

  it("handles both category and slug as empty", () => {
    expect(generateProductUrl("", null)).toBe("/shop/");
  });
});

// src/utils/fetchProductData.ts
// This fetches products by category from local JSON (temporary).
// Replace this later with backend API call: `/api/products?category=${category}`

/*export async function fetchProductsByCategory(category: string) {
  try {
    const response = await fetch("/data/products.json");
    const data = await response.json();
    return data[category] || [];
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return [];
  }
}*/


// src/utils/fetchProductData.ts

/**
 * Fetches products from a local JSON file by category.
 * 
 * @param category - The product category to filter by (e.g., "electronics").
 * @returns A Promise resolving to an array of products in the given category.
 * 
 * @note This is a temporary local fetch. Replace with backend API call:
 *       `/api/products?category=${category}`
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category: string;
  [key: string]: any; // for any other optional fields
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch("/data/products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Record<string, Product[]> = await response.json();

    if (!data[category]) {
      console.warn(`Category "${category}" not found in product data.`);
      return [];
    }

    return data[category];
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return [];
  }
}

// src/types/product.ts

export interface Product {
  _id?: string;        // MongoDB ID (optional for new products)
  id: string;         // Optional frontend ID (legacy / fallback)
  name: string;
  img: string;         // URL or local path to the product image
  desc: string;        // Short description
  spec?: string;       // Optional specs or details
  price: number;       // Pricing info
  quantity: number;
  brand?: string;      // ✅ e.g., "Apple", "Samsung"
  category?: string;   // ✅ e.g., "Electronics", "Clothing"
  rating?: number;     // ✅ Average rating
  tags?: string[];     // ✅ Search/filter keywords
  createdAt?: string;  // ✅ Optional (from backend timestamps)
  updatedAt?: string;  // ✅ Optional (from backend timestamps)
}

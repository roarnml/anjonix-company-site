// src/utils/product.ts
import axios from "axios";
import type { Product } from "../apps/tech/types/product";

const API_URL = "http://localhost:5000/api"; // change this if backend runs elsewhere

// ✅ Get all products (public)
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

// ✅ Add product (requires JWT)
export async function addProduct(product: Product, token: string): Promise<Product> {
  try {
    const res = await axios.post(`${API_URL}/products`, product, {
      headers: {
        Authorization: `Bearer ${token}`, // attach token here
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
}

/*
// src/pages/products/index.tsx
import { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import EcommerceLayout from "../../components/Layouts/EcommerceLayout";
import ProductCard from "../../components/ProductCard";
import SidebarFilters from "../../components/Filters/SidebarFilters";
import { slugify } from "../../utils/slugify";
import { getProducts, addProduct } from "../../../../utils/product"; // ✅ fix import path
import type { Product } from "../../types/product";
import { AuthContext } from "../../../../context/AuthContext"; // ✅ fix import path

export default function ProductsPage() {
  const { categorySlug } = useParams();
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext must be used inside AuthProvider");

  const { token } = auth; // ✅ extract token from AuthContext

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: [0, 1000000] as [number, number],
    rating: 0,
  });

  // ✅ Fetch products from API
  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  // ✅ Unique categories/brands
  const categories = Array.from(new Set(products.map((p) => p.category || "")));
  const brands = Array.from(new Set(products.map((p) => p.brand || "")));

  const matchSlug = (text: string) => slugify(text || "", { lower: true });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesRouteCategory =
        !categorySlug || matchSlug(p.category || "") === categorySlug;
      const matchesCategory =
        !filters.category || p.category === filters.category;
      const matchesBrand = !filters.brand || p.brand === filters.brand;
      const matchesPrice =
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const matchesRating = (p.rating || 0) >= filters.rating;

      return (
        matchesRouteCategory &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [filters, categorySlug, products]);

  const handleReset = () =>
    setFilters({
      category: "",
      brand: "",
      priceRange: [0, 1000000],
      rating: 0,
    });

  // ✅ Example add product (requires token)
  const handleAdd = async () => {
    if (!auth?.token) return alert("Login required!");

    const newProduct: Product = {
      id: "temp-id",
      name: "New Product",
      img: "",
      desc: "Sample description",
      price: 100,
      quantity: 1,
    };

    try {
      const added = await addProduct(newProduct, auth.token); // ✅ pass token
      setProducts((prev) => [...prev, added]);
    } catch {
      alert("Failed to add product");
    }
  };


  return (
    <EcommerceLayout
      title="Products"
      filters={
        <SidebarFilters
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={(category) =>
            setFilters((f) => ({ ...f, category }))
          }
          brands={brands}
          selectedBrand={filters.brand}
          onBrandChange={(brand) => setFilters((f) => ({ ...f, brand }))}
          priceRange={filters.priceRange}
          onPriceChange={(priceRange) =>
            setFilters((f) => ({ ...f, priceRange }))
          }
          selectedRating={filters.rating}
          onRatingChange={(rating) => setFilters((f) => ({ ...f, rating }))}
          onResetFilters={handleReset}
        />
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {token && (
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Product
        </button>
      )}
    </EcommerceLayout>
  );
}
*/

// src/pages/products/index.tsx
import { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import EcommerceLayout from "../../components/Layouts/EcommerceLayout";
import ProductCard from "../../components/ProductCard";
import SidebarFilters from "../../components/Filters/SidebarFilters";
import { slugify } from "../../utils/slugify";
import { getProducts, addProduct } from "../../../../utils/product";  // ✅ corrected path
import type { Product } from "../../types/product";
import { AuthContext } from "../../../../context/AuthContext"; // ✅ corrected path

export default function ProductsPage() {
  const { categorySlug } = useParams();
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("ProductsPage must be inside AuthProvider");

  const { token, user } = auth; // ✅ extract token and user

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: [0, 1000000] as [number, number],
    rating: 0,
  });

  // ✅ Fetch products
  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  // ✅ Unique categories & brands
  const categories = Array.from(new Set(products.map((p) => p.category || "")));
  const brands = Array.from(new Set(products.map((p) => p.brand || "")));

  const matchSlug = (text: string) => slugify(text || "", { lower: true });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesRouteCategory =
        !categorySlug || matchSlug(p.category || "") === categorySlug;
      const matchesCategory =
        !filters.category || p.category === filters.category;
      const matchesBrand = !filters.brand || p.brand === filters.brand;
      const matchesPrice =
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const matchesRating = (p.rating || 0) >= filters.rating;

      return (
        matchesRouteCategory &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [filters, categorySlug, products]);

  const handleReset = () =>
    setFilters({
      category: "",
      brand: "",
      priceRange: [0, 1000000],
      rating: 0,
    });

  // ✅ Example add product (requires token)
  const handleAdd = async () => {
    if (!token) return alert("Login required!");

    const newProduct: Product = {
      id: "temp-id",
      name: "New Product",
      img: "",
      desc: "Sample description",
      price: 100,
      quantity: 1,
    };

    try {
      const added = await addProduct(newProduct, token); // ✅ pass token
      setProducts((prev) => [...prev, added]);
    } catch {
      alert("Failed to add product");
    }
  };

  return (
    <EcommerceLayout
      title="Products"
      filters={
        <SidebarFilters
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={(category) =>
            setFilters((f) => ({ ...f, category }))
          }
          brands={brands}
          selectedBrand={filters.brand}
          onBrandChange={(brand) => setFilters((f) => ({ ...f, brand }))}
          priceRange={filters.priceRange}
          onPriceChange={(priceRange) =>
            setFilters((f) => ({ ...f, priceRange }))
          }
          selectedRating={filters.rating}
          onRatingChange={(rating) => setFilters((f) => ({ ...f, rating }))}
          onResetFilters={handleReset}
        />
      }
    >
      {/* ✅ Show user info */}
      {user && <p className="mb-4 text-gray-600">Logged in as: {user}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {token && (
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Product
        </button>
      )}
    </EcommerceLayout>
  );
}

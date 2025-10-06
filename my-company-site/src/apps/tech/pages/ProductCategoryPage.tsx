// pages/ProductCategoryPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EcommerceLayout from "../components/Layouts/EcommerceLayout";

export default function ProductCategoryPage() {
  const { category } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/data/products/${category}.json`)
      .then((res) => res.json())
      .then(setData);
  }, [category]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <EcommerceLayout title={category || "Products"} data={data}>
      <div>
        {/* Your product grid, filters, etc */}
        <h2 className="text-xl font-bold">All Products</h2>
        {/* maybe map over data here */}
      </div>
    </EcommerceLayout>
  );

}

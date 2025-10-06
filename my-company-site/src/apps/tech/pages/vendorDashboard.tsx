/*import { useEffect, useState } from "react";
import api from "../api/api";

export default function VendorDashboard() {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get("products/", {
      headers: { Authorization: `Token ${token}` }
    }).then(res => {
      const userId = localStorage.getItem("user_id");
      const filtered = res.data.filter(p => p.vendor === parseInt(userId!));
      setMyProducts(filtered);
    });
  }, []);

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      {myProducts.map(p => (
        <div>Products</div>
        //<div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
*/
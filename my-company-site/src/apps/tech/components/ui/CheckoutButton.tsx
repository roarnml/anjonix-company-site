// ✅ STRIPE CHECKOUT BUTTON
// CheckoutButton.tsx
import api from '../../api/api';

export default function CheckoutButton({ productId }: { productId: string }) {
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const res = await api.post("/checkout-session/", { product_id: productId }, {
      headers: { Authorization: `Token ${token}` }
    });
    window.location.href = res.data.url;
  };

  return <button onClick={handleCheckout}>Buy Now</button>;
}

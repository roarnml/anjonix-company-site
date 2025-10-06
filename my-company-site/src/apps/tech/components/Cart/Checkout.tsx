import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Import the cart context
import { Button } from "../ui/button";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart(); // use real cart
  const [billing, setBilling] = useState({ name: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({ address: "", city: "", state: "", zip: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "" });

  const shippingFee = cart.length > 0 ? 5000 : 0;
  const tax = total * 0.075;
  const grandTotal = total + shippingFee + tax;

  const handlePlaceOrder = () => {
    if (!billing.name || !billing.email || !shipping.address || !payment.cardNumber) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Order placed successfully!");
    clearCart(); // empty the cart after order
    navigate("/tech/order-confirmation"); // redirect to confirmation page
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Cart Summary */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₦{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal:</span> <span>₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Shipping:</span> <span>₦{shippingFee.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Tax (7.5%):</span> <span>₦{tax.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total:</span> <span>₦{grandTotal.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-xl font-bold">Billing Details</h2>
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded"
          value={billing.name} onChange={(e) => setBilling({ ...billing, name: e.target.value })} />
        <input type="email" placeholder="Email Address" className="w-full border p-2 rounded"
          value={billing.email} onChange={(e) => setBilling({ ...billing, email: e.target.value })} />
        <input type="tel" placeholder="Phone Number" className="w-full border p-2 rounded"
          value={billing.phone} onChange={(e) => setBilling({ ...billing, phone: e.target.value })} />

        <h2 className="text-xl font-bold">Shipping Details</h2>
        <input type="text" placeholder="Address" className="w-full border p-2 rounded"
          value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
        <input type="text" placeholder="City" className="w-full border p-2 rounded"
          value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
        <input type="text" placeholder="State" className="w-full border p-2 rounded"
          value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} />
        <input type="text" placeholder="ZIP Code" className="w-full border p-2 rounded"
          value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />

        <h2 className="text-xl font-bold">Payment</h2>
        <input type="text" placeholder="Card Number" className="w-full border p-2 rounded"
          value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} />
        <div className="flex gap-2">
          <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded"
            value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} />
          <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded"
            value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} />
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

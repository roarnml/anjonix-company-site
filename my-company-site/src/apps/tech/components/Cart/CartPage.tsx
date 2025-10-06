
import { useCart } from "./CartContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        🛒 Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center shadow-sm">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <p className="text-gray-400 text-sm mt-2">
            Start shopping to add items to your cart.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  ₦{item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold text-gray-800">Total:</p>
            <p className="text-xl font-bold text-blue-600">
              ₦{total.toLocaleString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={clearCart}>
              🗑 Clear Cart
            </Button>
            <Link to="/tech/checkout">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                ✅ Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

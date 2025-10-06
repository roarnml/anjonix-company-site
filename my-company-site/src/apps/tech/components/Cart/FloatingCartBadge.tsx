// /components/cart/FloatingCartBadge.tsx
/*import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function FloatingCartBadge() {
  const { cartCount } = useCart();

  return (
    <Link href="/cart">
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative bg-blue-600 p-4 rounded-full text-white hover:bg-blue-700 cursor-pointer shadow-lg">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
*/

'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

export default function FloatingCartBadge() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/tech/cart" className="fixed bottom-4 right-4 z-50">
      <div className="relative bg-blue-500 shadow-lg p-3 rounded-full hover:scale-105 transition">
        <ShoppingCart className="w-6 h-6 text-gray-800" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}

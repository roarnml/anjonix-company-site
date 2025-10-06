'use client';

import { useCart } from './CartContext';
import { Link } from "react-router-dom"; // if you're using React Router
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { CartProvider } from './CartContext';

export default function MiniCart() {
  const { cart } = useCart();
  const itemCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);


  return (
    <CartProvider>
        <div className="fixed top-4 right-0 z-50">
            <Link to="/tech/cart">
                <Button variant="outline" className="relative rounded-full p-2">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                    </span>
                )}
                </Button>
            </Link>
        </div>
    </CartProvider>
  );
}

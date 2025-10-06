'use client';

import type { Product } from '../types/product';
import { Button } from './ui/button';
import { useCart } from './Cart/CartContext';

interface ProductCardProps {
  product: Product;
  actionButton?: string; // optional button label
  onAction?: () => void; // optional button click handler

}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
      <img
        src={product.img}
        alt={product.name}
        className="w-32 h-32 object-contain mb-3"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.desc}</p>
      <p className="font-bold mb-3">₦{product.price}</p>
      <Button variant="default" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
    </div>
  );
}

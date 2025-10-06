// /components/cart/AddToCartButton.tsx
/*import { useCart } from './CartContext';

interface Props {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export default function AddToCartButton({ id, name, price, image }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={() => addToCart({ id, name, price, image, quantity: 1 })}
    >
      Add to Cart
    </button>
  );
}
*/
'use client';

import { useCart } from './CartContext';
import type { Product } from '../../types/product';
import { Button } from '../../components/ui/button';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <Button onClick={handleClick} variant="default">
      Add to Cart
    </Button>
  );
}

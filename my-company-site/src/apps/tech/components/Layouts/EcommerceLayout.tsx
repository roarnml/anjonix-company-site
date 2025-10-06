// /src/components/layout/EcommerceLayout.tsx
/*import type { ReactNode } from 'react';
import { useCart } from '../Cart/CartContext';
import FloatingCartBadge from '../Cart/FloatingCartBadge';
import SidebarFilters from '../Filters/SidebarFilters';

interface EcommerceLayoutProps {
  children: ReactNode;
  filters?: ReactNode;
  title?: string;
}

export default function EcommerceLayout({ children, filters, title }: EcommerceLayoutProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Filters }
      <aside className="w-64 bg-white p-4 shadow-md hidden lg:block">
        {filters || <SidebarFilters />}
      </aside>

      {/* Main Content }
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{title || 'Marketplace'}</h1>
          <button className="relative text-sm font-medium text-gray-700 hover:text-gray-900">
            🛒 Cart ({itemCount})
          </button>
        </header>

        {children}
        <FloatingCartBadge />
      </main>
    </div>
  );
}
*/

// /src/components/layout/EcommerceLayout.tsx
import type { ReactNode } from 'react';
import { useCart } from '../Cart/CartContext';
import FloatingCartBadge from '../Cart/FloatingCartBadge';
import SidebarFilters from '../Filters/SidebarFilters';

interface EcommerceLayoutProps {
  children: ReactNode;
  title?: string;
  data?: any[];

  /** Optional: custom filters UI instead of default SidebarFilters */
  filters?: ReactNode;

  /** Props for SidebarFilters */
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  selectedRating?: number;
  onRatingChange?: (rating: number) => void;
  onResetFilters?: () => void;
}

export default function EcommerceLayout({
  children,
  title,
  filters,
  categories = [],
  selectedCategory = '',
  onCategoryChange = () => {},
  priceRange = [0, 0],
  onPriceChange = () => {},
  selectedRating = 0,
  onRatingChange = () => {},
  onResetFilters,
}: EcommerceLayoutProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white p-4 shadow-md hidden lg:block">
        {filters || (
          <SidebarFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            priceRange={priceRange}
            onPriceChange={onPriceChange}
            selectedRating={selectedRating}
            onRatingChange={onRatingChange}
            onResetFilters={onResetFilters}
          />
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{title || 'Marketplace'}</h1>
          <button className="relative text-sm font-medium text-gray-700 hover:text-blue-500">
            🛒 Cart ({itemCount})
          </button>
        </header>

        {children}
        <FloatingCartBadge />
      </main>
    </div>
  );
}

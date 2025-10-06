// /src/pages/solutions/index.tsx
/*import { useState } from 'react';
import EcommerceLayout from '../../components/Layouts/EcommerceLayout';
import ProductCard from '../../components/ProductCard';
import SolutionRequestModal from '../../components/SolutionRequestModal';
import solutionsData from '../../data/solutions.json';
import SidebarFilters from '../../components/Filters/SidebarFilters';

export default function SolutionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const handleRequest = (solution: any) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  return (
    <EcommerceLayout title="Solutions" filters={<SidebarFilters />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {solutionsData.map((sol) => (
          <ProductCard
            key={sol.id}
            product={sol}
            actionButton="Request Solution"
            onAction={() => handleRequest(sol)}
          />
        ))}
      </div>

      <SolutionRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => console.log('Solution request:', selectedSolution, data)}
      />
    </EcommerceLayout>
  );
}
*/


// /src/pages/solutions/index.tsx
/*import { useState, useMemo } from 'react';
import EcommerceLayout from '../../components/Layouts/EcommerceLayout';
import ProductCard from '../../components/ProductCard';
import SolutionRequestModal from '../../components/SolutionRequestModal';
import solutionsData from '../../data/solutions.json';
import type { Product } from '../../types/product';

export default function SolutionsPage() {
  // Sidebar filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Product | null>(null);

  const handleRequest = (solution: Product) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  // Build categories dynamically from data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(solutionsData.map((item) => item.category || 'Other')));
    return unique;
  }, []);

  // Filtered data based on sidebar filters
  const filteredSolutions = useMemo(() => {
    return solutionsData.filter((sol) => {
      const matchesCategory = selectedCategory ? sol.category === selectedCategory : true;

      // Convert price strings like "₦450,000" → number
      const priceNum = Number(sol.pricing?.replace(/[^\d]/g, '') || 0);
      const matchesPrice = priceNum >= priceRange[0] && priceNum <= priceRange[1];

      // Optional: assuming `rating` exists
      const matchesRating = selectedRating ? (sol.rating || 0) >= selectedRating : true;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [solutionsData, selectedCategory, priceRange, selectedRating]);

  return (
    <EcommerceLayout
      title="Solutions"
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      selectedRating={selectedRating}
      onRatingChange={setSelectedRating}
      onResetFilters={() => {
        setSelectedCategory('');
        setPriceRange([0, 1000000]);
        setSelectedRating(0);
      }}
    >
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredSolutions.map((sol) => {
        const product = {
          id: String(sol.id), // convert to string if Product.id is string
          name: sol.name,
          price: parseFloat(sol.pricing) || 0, // convert pricing to number
          quantity: 1, // default
          image: sol.img,
          rating: sol.rating,
          category: sol.category
        };

        return (
          <ProductCard
            key={sol.id}
            product={product}
            actionButton="Request Solution"
            onAction={() => handleRequest(sol)}
          />
        );
      })}
    </div>


      <SolutionRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) =>
          console.log('Solution request:', selectedSolution, data)
        }
      />
    </EcommerceLayout>
  );
}*/


// /src/pages/solutions/index.tsx
import { useState, useMemo } from 'react';
import EcommerceLayout from '../../components/Layouts/EcommerceLayout';
import SolutionRequestModal from '../../components/SolutionRequestModal';
import SolutionsCard, { type Solution } from '../../components/SolutionsCard';
import solutionsData from '../../data/solutions.json';

export default function SolutionsPage() {
  // Sidebar filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const handleRequest = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  // Build categories dynamically from data
  const categories = useMemo(() => {
    return Array.from(new Set(solutionsData.map((item) => item.category || 'Other')));
  }, []);

  // Filtered data
  const filteredSolutions = useMemo(() => {
    return solutionsData.filter((sol) => {
      const matchesCategory = selectedCategory ? sol.category === selectedCategory : true;

      const priceNum = Number(sol.pricing.replace(/[^\d]/g, '') || 0);
      const matchesPrice = priceNum >= priceRange[0] && priceNum <= priceRange[1];

      const matchesRating = selectedRating ? sol.rating >= selectedRating : true;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [selectedCategory, priceRange, selectedRating]);

  return (
    <EcommerceLayout
      title="Solutions"
      categories={categories ?? []} // ✅ ensures it's always an array
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      selectedRating={selectedRating}
      onRatingChange={setSelectedRating}
      onResetFilters={() => {
        setSelectedCategory('');
        setPriceRange([0, 1000000]);
        setSelectedRating(0);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSolutions.map((sol) => (
          <SolutionsCard
            key={sol.id}
            solution={sol}
            actionLabel="Request Solution"
            onAction={() => handleRequest(sol)}
          />
        ))}
      </div>

      <SolutionRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) =>
          console.log('Solution request:', selectedSolution, data)
        }
      />
    </EcommerceLayout>
  );
}


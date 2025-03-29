import { Container } from '@/components/ui/container';
import ProductCard from '@/components/shop/ProductCard';
import ProductFilters from '@/components/shop/ProductFilters';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  materials: string[];
  sortBy: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  material?: string;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Medicine Buddha",
    slug: "medicine-buddha",
    description: "Hand-carved copper statue with turquoise inlay",
    price: 289,
    category: "buddhas",
    material: "Copper",
    images: ["https://images.unsplash.com/photo-1599639668273-a295bcfd16ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    isNew: true
  },
  {
    id: 2,
    name: "Tibetan Singing Bowl",
    slug: "tibetan-singing-bowl",
    description: "7 metals singing bowl with wooden striker",
    price: 119,
    category: "singing-bowls",
    material: "Metal",
    images: ["https://images.unsplash.com/photo-1618939304347-e91b1f33d2ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    isBestSeller: true
  },
  {
    id: 3,
    name: "Green Tara",
    slug: "green-tara",
    description: "Fully gold-plated brass statue with gemstones",
    price: 349,
    category: "bodhisattvas",
    material: "Brass",
    images: ["https://images.unsplash.com/photo-1577729571322-0acbfff3e68b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"]
  },
  {
    id: 4,
    name: "Prayer Wheel",
    slug: "prayer-wheel",
    description: "Hand-carved with embedded mantras",
    price: 89,
    category: "custom-orders",
    material: "Wood",
    images: ["https://images.unsplash.com/photo-1620310252507-c65943dbd411?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    isNew: true
  },
  {
    id: 5,
    name: "Avalokiteshvara",
    slug: "avalokiteshvara",
    description: "Four-armed compassion deity statue",
    price: 399,
    category: "bodhisattvas",
    material: "Bronze",
    images: ["https://images.unsplash.com/photo-1606371499251-1efa8219f1d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"]
  },
  {
    id: 6,
    name: "Mahakala Mask",
    slug: "mahakala-mask",
    description: "Traditional handcrafted protective deity mask",
    price: 199,
    category: "protectors",
    material: "Wood",
    images: ["https://images.unsplash.com/photo-1602080494753-10e4cd88d717?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"]
  }
];

const Shop = () => {
  const [location] = useLocation();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    materials: [],
    sortBy: 'newest'
  });
  
  // Parse URL parameters for initial filters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [location]);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products', filters],
    staleTime: Infinity
  });
  
  const displayProducts = products || defaultProducts;
  
  // Apply filters client-side (in a real app, filters would be applied server-side)
  const filteredProducts = displayProducts.filter(product => {
    // Filter by category
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    
    // Filter by price
    if (
      (product.discountedPrice || product.price) < filters.priceRange[0] ||
      (product.discountedPrice || product.price) > filters.priceRange[1]
    ) {
      return false;
    }
    
    // Filter by material
    if (filters.materials.length > 0 && !filters.materials.includes(product.material || '')) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case 'price-desc':
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case 'popular':
        // Sort by best sellers first for demo
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      case 'newest':
      default:
        // Sort by new products first for demo
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
  });
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-[#FAFAF5] py-12">
      <Container>
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Shop Buddhist Handicrafts</h1>
          <p className="text-gray-600">
            Browse our collection of meticulously handcrafted Buddhist statues and artifacts
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Sidebar on desktop, dropdown on mobile */}
          <div className="lg:w-1/4">
            <ProductFilters 
              onFilterChange={handleFilterChange} 
              initialFilters={filters}
            />
          </div>
          
          {/* Product grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-[400px]">
                    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-serif text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;

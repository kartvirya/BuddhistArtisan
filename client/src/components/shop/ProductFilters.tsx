import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface CategoryOption {
  id: number;
  name: string;
  slug: string;
}

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  className?: string;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  materials: string[];
  sortBy: string;
}

const defaultCategories: CategoryOption[] = [
  { id: 1, name: "Buddhas", slug: "buddhas" },
  { id: 2, name: "Bodhisattvas", slug: "bodhisattvas" },
  { id: 3, name: "Gurus", slug: "gurus" },
  { id: 4, name: "Protectors", slug: "protectors" },
  { id: 5, name: "Singing Bowls", slug: "singing-bowls" },
  { id: 6, name: "Custom Orders", slug: "custom-orders" }
];

const defaultMaterials = [
  "Copper", "Brass", "Bronze", "Silver", "Gold", "Wood", "Clay", "Stone"
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" }
];

const ProductFilters = ({ onFilterChange, initialFilters, className = '' }: FilterProps) => {
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: Infinity
  });
  
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters?.categories || [],
    priceRange: initialFilters?.priceRange || [0, 1000],
    materials: initialFilters?.materials || [],
    sortBy: initialFilters?.sortBy || 'newest'
  });
  
  // Update filters when initialFilters prop changes
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);
  
  const handleCategoryChange = (slug: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, slug]
      : filters.categories.filter(cat => cat !== slug);
    
    updateFilters({ ...filters, categories: newCategories });
  };
  
  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter(m => m !== material);
    
    updateFilters({ ...filters, materials: newMaterials });
  };
  
  const handlePriceChange = (values: number[]) => {
    updateFilters({ ...filters, priceRange: [values[0], values[1]] });
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ ...filters, sortBy: e.target.value });
  };
  
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const resetFilters: FilterState = {
      categories: [],
      priceRange: [0, 1000],
      materials: [],
      sortBy: 'newest'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  const displayCategories = categories || defaultCategories;

  // Desktop filter component
  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {displayCategories.map(category => (
            <div key={category.id} className="flex items-center">
              <Checkbox 
                id={`category-${category.slug}`}
                checked={filters.categories.includes(category.slug)}
                onCheckedChange={(checked) => handleCategoryChange(category.slug, checked === true)}
                className="mr-2 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
              />
              <label 
                htmlFor={`category-${category.slug}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-serif font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            value={[filters.priceRange[0], filters.priceRange[1]]}
            min={0}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex justify-between text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-serif font-semibold mb-4">Materials</h3>
        <div className="space-y-2">
          {defaultMaterials.map(material => (
            <div key={material} className="flex items-center">
              <Checkbox 
                id={`material-${material}`}
                checked={filters.materials.includes(material)}
                onCheckedChange={(checked) => handleMaterialChange(material, checked === true)}
                className="mr-2 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
              />
              <label 
                htmlFor={`material-${material}`}
                className="text-sm cursor-pointer"
              >
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="w-full border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white"
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop filters */}
      <div className={`hidden lg:block ${className}`}>
        <FiltersContent />
      </div>
      
      {/* Mobile filters */}
      <div className="lg:hidden flex items-center justify-between mb-4 w-full">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-[#800000] text-[#800000]">
              <i className="fas fa-filter mr-2"></i> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <h2 className="font-serif text-xl font-bold mb-6">Filters</h2>
            <FiltersContent />
          </SheetContent>
        </Sheet>
        
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="p-2 border rounded-md bg-white text-sm"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Desktop sort options */}
      <div className="hidden lg:block">
        <h3 className="font-serif font-semibold mb-4">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border rounded-md bg-white"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ProductFilters;

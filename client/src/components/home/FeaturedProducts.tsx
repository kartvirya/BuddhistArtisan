import { Container } from '../ui/container';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../shop/ProductCard';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  category: string;
  material?: string;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
}

const DefaultFeaturedProducts: Product[] = [
  {
    id: 1,
    name: "Medicine Buddha",
    slug: "medicine-buddha",
    description: "Hand-carved copper statue with turquoise inlay",
    price: 289,
    images: ["https://images.unsplash.com/photo-1599639668273-a295bcfd16ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    category: "buddhas",
    material: "Copper",
    isNew: true,
    isBestSeller: false,
    isFeatured: true
  },
  {
    id: 2,
    name: "Tibetan Singing Bowl",
    slug: "tibetan-singing-bowl",
    description: "7 metals singing bowl with wooden striker",
    price: 119,
    images: ["https://images.unsplash.com/photo-1618939304347-e91b1f33d2ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    category: "singing-bowls",
    material: "Metal",
    isNew: false,
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 3,
    name: "Green Tara",
    slug: "green-tara",
    description: "Fully gold-plated brass statue with gemstones",
    price: 349,
    images: ["https://images.unsplash.com/photo-1577729571322-0acbfff3e68b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    category: "bodhisattvas",
    material: "Brass",
    isNew: false,
    isBestSeller: false,
    isFeatured: true
  },
  {
    id: 4,
    name: "Prayer Wheel",
    slug: "prayer-wheel",
    description: "Hand-carved with embedded mantras",
    price: 89,
    images: ["https://images.unsplash.com/photo-1620310252507-c65943dbd411?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    category: "custom-orders",
    isNew: true,
    isBestSeller: false,
    isFeatured: true
  }
];

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['/api/products/featured'],
    staleTime: Infinity
  });

  const displayProducts = featuredProducts || DefaultFeaturedProducts;

  return (
    <section className="py-16 bg-[#FAFAF5]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-2">Featured Products</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our most popular handcrafted pieces, created by master artisans using traditional techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/shop">
            <Button variant="outline" className="inline-block border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white px-8 py-3 rounded-md font-medium transition duration-300">
              View All Products
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;

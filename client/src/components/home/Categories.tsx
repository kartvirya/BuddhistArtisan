import { Link } from 'wouter';
import { Container } from '../ui/container';
import { useQuery } from '@tanstack/react-query';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
}

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link 
      href={`/shop?category=${category.slug}`} 
      className="category-card bg-[#F5F5DC] rounded-lg p-4 text-center transition duration-300 hover:bg-[#D4AF37] hover:text-white transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
        <i className={`${category.icon} text-3xl text-[#D4AF37]`}></i>
      </div>
      <h3 className="font-serif font-medium">{category.name}</h3>
    </Link>
  );
};

const DefaultCategories = [
  { id: 1, name: "Buddhas", slug: "buddhas", icon: "fas fa-om", description: null },
  { id: 2, name: "Bodhisattvas", slug: "bodhisattvas", icon: "fas fa-praying-hands", description: null },
  { id: 3, name: "Gurus", slug: "gurus", icon: "fas fa-user-alt", description: null },
  { id: 4, name: "Protectors", slug: "protectors", icon: "fas fa-shield-alt", description: null },
  { id: 5, name: "Singing Bowls", slug: "singing-bowls", icon: "fas fa-bell", description: null },
  { id: 6, name: "Custom Orders", slug: "custom-orders", icon: "fas fa-magic", description: null }
];

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: Infinity,
  });

  const displayCategories = categories || DefaultCategories;

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-2">Our Categories</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our collection of meticulously handcrafted Buddhist statues and artifacts, 
            each created with devotion and traditional techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;

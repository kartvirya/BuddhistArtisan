import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  createdAt: string;
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Symbolism of Buddha Statues",
    slug: "symbolism-buddha-statues",
    content: "Buddha statues are more than decorative pieces; they carry deep symbolism in Buddhist tradition. The different hand gestures (mudras) represent various aspects of the Buddha's teachings. For example, the earth-touching right hand represents the moment of enlightenment, while hands placed in the lap signify meditation. The elongated earlobes remind us of the Buddha's royal past and his rejection of material wealth. The serene smile and half-closed eyes demonstrate the perfect balance between meditation and engagement with the world...",
    excerpt: "Understanding the meaning behind different Buddha poses and what they represent in Buddhist tradition.",
    coverImage: "https://images.unsplash.com/photo-1530254843304-219aac509830?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Tenzin Norbu",
    createdAt: "2023-05-15T00:00:00.000Z"
  },
  {
    id: 2,
    title: "The Healing Sound of Singing Bowls",
    slug: "healing-sound-singing-bowls",
    content: "Tibetan singing bowls have been used for centuries for meditation and healing. When played, these bowls create a range of harmonics that are believed to entrain brainwaves into more relaxed states. Traditional bowls are made from a seven-metal alloy representing gold, silver, mercury, copper, iron, tin, and lead, though the exact proportions remain a closely guarded secret among master craftsmen. Each metal is associated with a celestial body and particular energy. Modern research has begun to validate the therapeutic effects of these instruments on stress reduction, pain management, and even cellular regeneration...",
    excerpt: "How singing bowls can enhance meditation practice and promote healing through sound vibrations.",
    coverImage: "https://images.unsplash.com/photo-1519922545699-fee10aaa0a3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Karma Rinchen",
    createdAt: "2023-04-28T00:00:00.000Z"
  },
  {
    id: 3,
    title: "Meet the Master Craftsmen",
    slug: "meet-master-craftsmen",
    content: "Behind each Old Stupa piece is a master craftsman with decades of experience and devotion to their art. Many of our artisans began training in childhood through the traditional master-apprentice system. Take Pemba Sherpa, for example, who has been creating bronze Buddha statues for over 35 years. He learned the lost-wax casting technique from his father and has refined it to create statues of exceptional detail and spiritual presence. Or Lhamo Dolkar, a thangka painter who creates her own mineral-based pigments using techniques passed down through 15 generations in her family. These craftspeople don't just create objects; they participate in a living tradition that connects them to centuries of Buddhist artistic expression...",
    excerpt: "The stories of our artisans who have dedicated their lives to preserving traditional Buddhist crafts.",
    coverImage: "https://images.unsplash.com/photo-1570289470121-c1b5b36631a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Dorje Lama",
    createdAt: "2023-04-10T00:00:00.000Z"
  },
  {
    id: 4,
    title: "The Significance of Buddhist Prayer Flags",
    slug: "significance-buddhist-prayer-flags",
    content: "Buddhist prayer flags are not merely decorative; they carry deep spiritual significance. The five colors—blue, white, red, green, and yellow—represent the five elements: sky, air, fire, water, and earth. Traditionally printed with mantras and sacred symbols, these flags are believed to spread blessings through the air as they flutter in the wind. Unlike many religious artifacts, prayer flags are not meant to carry prayers to gods, but rather to spread good will and compassion into all pervading space. As the images and mantras are blown by the wind, positive energy is carried to all beings. The flags should never touch the ground and are traditionally burned when old, sending a final prayer to the heavens...",
    excerpt: "Learn about the meaning of colors and symbols on traditional Tibetan prayer flags.",
    coverImage: "https://images.unsplash.com/photo-1518639083075-fbc3c13d6cff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Ngawang Dhondup",
    createdAt: "2023-03-22T00:00:00.000Z"
  },
  {
    id: 5,
    title: "Understanding Buddhist Mandalas",
    slug: "understanding-buddhist-mandalas",
    content: "Mandalas are sacred geometric designs that hold deep spiritual significance in Buddhism. The word 'mandala' comes from Sanskrit meaning 'circle,' but these intricate artworks represent much more than their shape suggests. They are cosmic diagrams that represent the universe and serve as aids for meditation practices. Creating a sand mandala is a meditation in itself, requiring extraordinary patience and focus. Monks work for days or weeks to create elaborate designs using colored sand, only to sweep them away upon completion—a powerful reminder of impermanence. In Tibetan Buddhism, mandalas often represent the palace of a specific deity, with layers of meaning embedded in each geometric pattern and symbol...",
    excerpt: "Exploring the complex symbolism and meditative purpose of Buddhist mandala art.",
    coverImage: "https://images.unsplash.com/photo-1572878297902-8ae8647060e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Tenzin Norbu",
    createdAt: "2023-03-05T00:00:00.000Z"
  },
  {
    id: 6,
    title: "The Art of Thangka Painting",
    slug: "art-of-thangka-painting",
    content: "Thangka paintings are more than beautiful art—they are tools for teaching and contemplation in Tibetan Buddhism. These scroll paintings depict deities, mandalas, or important scenes from Buddhist teachings. Creating a thangka follows strict iconographic rules regarding proportions, postures, and colors, as each element carries specific spiritual meaning. The process begins with preparing a cotton canvas with a mixture of chalk and hide glue. Artists then make preliminary sketches following precise measurements before applying mineral pigments made from ground precious stones, plants, and even gold. A skilled thangka painter may spend months or even years completing a single painting, infusing each brushstroke with meditative attention. These sacred paintings are traditionally kept unframed and covered with silk when not being viewed...",
    excerpt: "Discover the traditional techniques and spiritual discipline behind Tibetan scroll paintings.",
    coverImage: "https://images.unsplash.com/photo-1517778991803-503cf8ae36de?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Lhamo Dolkar",
    createdAt: "2023-02-18T00:00:00.000Z"
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm transition duration-300 hover:shadow-md">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="mr-3"><i className="far fa-calendar-alt mr-1"></i> {formatDate(post.createdAt)}</span>
          <span><i className="far fa-user mr-1"></i> By {post.author}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-serif font-semibold text-xl mb-3 hover:text-[#800000] transition duration-300">{post.title}</h3>
        </Link>
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-[#800000] hover:text-[#D4AF37] font-medium transition duration-300 inline-flex items-center"
        >
          Read More <i className="fas fa-arrow-right ml-2 text-sm"></i>
        </Link>
      </div>
    </article>
  );
};

const categories = [
  { name: "Buddhist Art", count: 8 },
  { name: "Meditation", count: 6 },
  { name: "Craftsmanship", count: 5 },
  { name: "Symbolism", count: 7 },
  { name: "Spirituality", count: 4 },
  { name: "Culture", count: 3 }
];

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['/api/blog'],
    staleTime: Infinity
  });
  
  const displayPosts = blogPosts || defaultBlogPosts;
  
  // Filter posts based on search query and selected category
  const filteredPosts = displayPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If no category is selected, just check search
    if (!selectedCategory) return matchesSearch;
    
    // Otherwise, match both search and a mock category (in a real app, posts would have categories)
    // For this mock, we'll just assume some arbitrary mapping based on post ID
    const postCategories = [
      "Buddhist Art", 
      "Meditation", 
      "Craftsmanship", 
      "Symbolism", 
      "Spirituality", 
      "Culture"
    ];
    const hasCategory = postCategories[post.id % postCategories.length] === selectedCategory;
    
    return matchesSearch && hasCategory;
  });

  return (
    <div className="bg-[#FAFAF5] py-12">
      <Container>
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Our Blog</h1>
          <p className="text-gray-600">
            Explore articles on Buddhist art, meditation practices, and the stories behind our crafts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-serif font-semibold text-xl mb-4">Search</h3>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none bg-[#800000] hover:bg-[#D4AF37]">
                  <i className="fas fa-search"></i>
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-serif font-semibold text-xl mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      className={`flex justify-between w-full py-2 px-1 hover:text-[#800000] transition duration-300 ${selectedCategory === category.name ? 'text-[#800000] font-medium' : 'text-gray-700'}`}
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-serif font-semibold text-xl mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {displayPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="flex items-start">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="font-medium hover:text-[#800000] transition duration-300"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#800000] text-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-xl mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to receive updates on new blog posts and products.</p>
              <Input
                type="email"
                placeholder="Your email address"
                className="mb-3 text-black"
              />
              <Button className="w-full bg-[#D4AF37] hover:bg-opacity-90">
                Subscribe
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-[400px]">
                    <div className="w-full h-48 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
                <h3 className="font-serif text-xl font-semibold mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any posts matching your search criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="bg-[#800000] hover:bg-[#D4AF37]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                    <i className="fas fa-chevron-left"></i>
                  </Button>
                  <Button variant="outline" size="sm" className="w-9 h-9 p-0 bg-[#800000] text-white border-[#800000]">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                    <i className="fas fa-chevron-right"></i>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogIndex;

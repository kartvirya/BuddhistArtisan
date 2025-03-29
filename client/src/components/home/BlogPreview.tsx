import { Container } from '../ui/container';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { truncate } from '@/lib/utils';

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

const defaultBlogPosts = [
  {
    id: 1,
    title: "The Symbolism of Buddha Statues",
    slug: "symbolism-buddha-statues",
    content: "Full content here...",
    excerpt: "Understanding the meaning behind different Buddha poses and what they represent in Buddhist tradition.",
    coverImage: "https://images.unsplash.com/photo-1530254843304-219aac509830?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Admin",
    createdAt: "2023-05-15T00:00:00.000Z"
  },
  {
    id: 2,
    title: "The Healing Sound of Singing Bowls",
    slug: "healing-sound-singing-bowls",
    content: "Full content here...",
    excerpt: "How singing bowls can enhance meditation practice and promote healing through sound vibrations.",
    coverImage: "https://images.unsplash.com/photo-1519922545699-fee10aaa0a3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Admin",
    createdAt: "2023-04-28T00:00:00.000Z"
  },
  {
    id: 3,
    title: "Meet the Master Craftsmen",
    slug: "meet-master-craftsmen",
    content: "Full content here...",
    excerpt: "The stories of our artisans who have dedicated their lives to preserving traditional Buddhist crafts.",
    coverImage: "https://images.unsplash.com/photo-1570289470121-c1b5b36631a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    author: "Admin",
    createdAt: "2023-04-10T00:00:00.000Z"
  }
];

const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article className="bg-[#FAFAF5] rounded-lg overflow-hidden shadow-sm">
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="mr-3"><i className="far fa-calendar-alt mr-1"></i> {formatDate(post.createdAt)}</span>
          <span><i className="far fa-user mr-1"></i> By {post.author}</span>
        </div>
        <h3 className="font-serif font-semibold text-xl mb-3">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.excerpt || truncate(post.content, 100)}</p>
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

const BlogPreview = () => {
  const { data: blogPosts } = useQuery({
    queryKey: ['/api/blog/recent'],
    staleTime: Infinity
  });
  
  const displayPosts = blogPosts || defaultBlogPosts;

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-2">From Our Blog</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our articles about Buddhist symbolism, meditation practices, and the stories behind our crafts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogPreview;

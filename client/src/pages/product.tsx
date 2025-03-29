import { Container } from '@/components/ui/container';
import ProductGallery from '@/components/shop/ProductGallery';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/shop/ProductCard';

const defaultProduct = {
  id: 1,
  name: "Medicine Buddha",
  slug: "medicine-buddha",
  description: "Hand-carved copper statue with turquoise inlay. The Medicine Buddha represents the healing aspect of the Buddha nature and is believed to help overcome physical and mental illness.",
  price: 289,
  discountedPrice: null,
  category: "buddhas",
  material: "Copper with turquoise inlays",
  dimensions: "Height: 20cm, Width: 15cm, Depth: 12cm",
  weight: "1.5kg",
  images: [
    "https://images.unsplash.com/photo-1599639668273-a295bcfd16ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    "https://images.unsplash.com/photo-1598449356655-f172ebe908f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    "https://images.unsplash.com/photo-1508107530852-0e9489d27352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  ],
  isNew: true,
  isBestSeller: false
};

const defaultRelatedProducts = [
  {
    id: 2,
    name: "Tibetan Singing Bowl",
    slug: "tibetan-singing-bowl",
    description: "7 metals singing bowl with wooden striker",
    price: 119,
    category: "singing-bowls",
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
    images: ["https://images.unsplash.com/photo-1577729571322-0acbfff3e68b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"]
  },
  {
    id: 4,
    name: "Prayer Wheel",
    slug: "prayer-wheel",
    description: "Hand-carved with embedded mantras",
    price: 89,
    category: "custom-orders",
    images: ["https://images.unsplash.com/photo-1620310252507-c65943dbd411?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
    isNew: true
  }
];

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: [`/api/products/${slug}`],
    staleTime: Infinity
  });
  
  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery({
    queryKey: [`/api/products/related/${slug}`],
    staleTime: Infinity
  });
  
  const displayProduct = product || defaultProduct;
  const displayRelatedProducts = relatedProducts || defaultRelatedProducts;
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.discountedPrice || displayProduct.price,
      quantity,
      image: displayProduct.images[0]
    });
    
    toast({
      title: "Added to cart",
      description: `${displayProduct.name} × ${quantity} has been added to your cart.`,
    });
  };
  
  const renderRating = () => (
    <div className="flex items-center mb-4">
      <div className="flex text-[#D4AF37] mr-2">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half-alt"></i>
      </div>
      <span className="text-gray-600 text-sm">(24 reviews)</span>
    </div>
  );

  if (isProductLoading) {
    return (
      <div className="py-12 bg-[#FAFAF5]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 animate-pulse h-[400px] rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2 mt-8"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-[#FAFAF5]">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link href="/" className="hover:text-[#D4AF37] transition duration-300">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/shop" className="hover:text-[#D4AF37] transition duration-300">
                Shop
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`/shop?category=${displayProduct.category}`} className="hover:text-[#D4AF37] transition duration-300">
                {displayProduct.category.charAt(0).toUpperCase() + displayProduct.category.slice(1)}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li>{displayProduct.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Gallery */}
          <ProductGallery images={displayProduct.images} productName={displayProduct.name} />
          
          {/* Product Info */}
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">{displayProduct.name}</h1>
            
            {renderRating()}
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-xl font-semibold mr-3">
                  {formatPrice(displayProduct.discountedPrice || displayProduct.price)}
                </span>
                
                {displayProduct.discountedPrice && (
                  <span className="text-gray-500 line-through">
                    {formatPrice(displayProduct.price)}
                  </span>
                )}
              </div>
              
              <p className="text-green-600 text-sm mt-1">
                <i className="fas fa-check-circle mr-1"></i> In Stock
              </p>
            </div>
            
            <div className="border-t border-gray-200 py-6">
              <p className="text-gray-700 mb-6">{displayProduct.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {displayProduct.material && (
                  <div>
                    <span className="text-gray-600 block mb-1">Material:</span>
                    <span className="font-medium">{displayProduct.material}</span>
                  </div>
                )}
                
                {displayProduct.dimensions && (
                  <div>
                    <span className="text-gray-600 block mb-1">Dimensions:</span>
                    <span className="font-medium">{displayProduct.dimensions}</span>
                  </div>
                )}
                
                {displayProduct.weight && (
                  <div>
                    <span className="text-gray-600 block mb-1">Weight:</span>
                    <span className="font-medium">{displayProduct.weight}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 border"
                  onClick={handleDecrement}
                >
                  <i className="fas fa-minus"></i>
                </Button>
                
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-14 h-10 mx-1 text-center border rounded-md"
                />
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-10 w-10 p-0 border"
                  onClick={handleIncrement}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
              
              <Button 
                className="bg-[#800000] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium transition duration-300 flex-grow"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </Button>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-gray-600">
                <i className="fas fa-heart mr-2"></i> Add to Wishlist
              </Button>
              
              <Button variant="ghost" className="text-gray-600">
                <i className="fas fa-share-alt mr-2"></i> Share
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="fas fa-shipping-fast mr-2 text-[#D4AF37]"></i>
                  Free Worldwide Shipping
                </div>
                
                <div className="flex items-center">
                  <i className="fas fa-certificate mr-2 text-[#D4AF37]"></i>
                  Authenticity Certificate
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isRelatedLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-[400px]">
                  <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-1/2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                </div>
              ))
            ) : (
              displayRelatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;

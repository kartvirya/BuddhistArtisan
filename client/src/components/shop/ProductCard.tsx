import { Link } from 'wouter';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice, getProductBadge } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

// Default placeholder image in case product image fails to load
const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const badge = getProductBadge(product);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      image: imageError ? DEFAULT_IMAGE : product.images[0],
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleImageError = () => {
    setImageError(true);
    console.warn(`Image failed to load for product: ${product.name}`);
  };
  
  const renderRating = () => {
    return (
      <div className="flex text-[#D4AF37]">
        <i className="fas fa-star text-sm"></i>
        <i className="fas fa-star text-sm"></i>
        <i className="fas fa-star text-sm"></i>
        <i className="fas fa-star text-sm"></i>
        <i className="fas fa-star-half-alt text-sm"></i>
      </div>
    );
  };

  return (
    <div 
      className={`product-card bg-white rounded-lg overflow-hidden shadow-sm transition duration-300 transform hover:-translate-y-1 hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative group">
          <img 
            src={imageError ? DEFAULT_IMAGE : product.images[0]} 
            alt={product.name} 
            className="w-full h-64 object-cover"
            onError={handleImageError}
          />
          <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              className="bg-white text-[#3A3238] rounded-full p-3 mx-1 hover:bg-[#D4AF37] hover:text-white transition duration-300"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
            <button 
              className="bg-white text-[#3A3238] rounded-full p-3 mx-1 hover:bg-[#D4AF37] hover:text-white transition duration-300"
              aria-label="Add to wishlist"
            >
              <i className="fas fa-heart"></i>
            </button>
            <button 
              className="bg-white text-[#3A3238] rounded-full p-3 mx-1 hover:bg-[#D4AF37] hover:text-white transition duration-300"
              aria-label="Quick view"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          {badge && (
            <span className={`absolute top-4 left-4 ${badge.bgColor} text-white text-xs px-2 py-1 rounded`}>
              {badge.text}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-serif font-semibold text-lg">{product.name}</h3>
            {renderRating()}
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-medium text-lg">
              {formatPrice(product.discountedPrice || product.price)}
              {product.discountedPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </span>
            <button 
              className="bg-[#800000] hover:bg-[#D4AF37] text-white px-3 py-1 rounded-md text-sm transition duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

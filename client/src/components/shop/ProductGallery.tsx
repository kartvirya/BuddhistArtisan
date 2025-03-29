import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

// Default placeholder image in case product image fails to load
const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [mainImage, setMainImage] = useState(images[0] || DEFAULT_IMAGE);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // Update main image when images prop changes or if current mainImage has an error
  useEffect(() => {
    if (images.length > 0) {
      const firstValidImage = images.find(img => !imageErrors[img]) || DEFAULT_IMAGE;
      setMainImage(firstValidImage);
    } else {
      setMainImage(DEFAULT_IMAGE);
    }
  }, [images, imageErrors]);
  
  const handleImageError = (image: string) => {
    console.warn(`Image failed to load: ${image}`);
    setImageErrors(prev => ({
      ...prev,
      [image]: true
    }));
    
    // If main image failed, find first non-errored image
    if (image === mainImage) {
      const firstValidImage = images.find(img => !imageErrors[img] && img !== image);
      if (firstValidImage) {
        setMainImage(firstValidImage);
      } else {
        setMainImage(DEFAULT_IMAGE);
      }
    }
  };
  
  const handleThumbnailClick = (image: string) => {
    if (!imageErrors[image]) {
      setMainImage(image);
    }
  };
  
  const handleMouseEnter = () => {
    if (window.innerWidth > 768 && mainImage !== DEFAULT_IMAGE) {
      setIsZoomed(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsZoomed(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Filter out images with errors for thumbnails
  const validImages = images.filter(img => !imageErrors[img]);
  const thumbnailImages = validImages.length > 0 ? validImages : [DEFAULT_IMAGE];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
      <div className="order-2 md:order-1 flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 mt-2 md:mt-0">
        {thumbnailImages.map((image, index) => (
          <div 
            key={index}
            className={cn(
              "cursor-pointer rounded-md overflow-hidden border-2 min-w-[70px] h-[70px]",
              mainImage === image ? "border-[#D4AF37]" : "border-transparent"
            )}
            onClick={() => handleThumbnailClick(image)}
          >
            <img 
              src={image} 
              alt={`${productName} thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
              onError={() => handleImageError(image)}
            />
          </div>
        ))}
      </div>
      
      {/* Main image */}
      <div 
        className="order-1 md:order-2 md:col-span-4 relative rounded-lg overflow-hidden bg-white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div 
          className={cn(
            "w-full h-[300px] md:h-[500px] overflow-hidden relative",
            mainImage !== DEFAULT_IMAGE && isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
        >
          <img 
            src={mainImage} 
            alt={productName} 
            className={cn(
              "w-full h-full object-contain transition-transform duration-200",
              isZoomed ? "absolute" : ""
            )}
            style={
              isZoomed && mainImage !== DEFAULT_IMAGE
                ? { 
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: "scale(1.5)",
                  width: "100%", 
                  height: "100%",
                  objectFit: "cover" 
                }
                : {}
            }
            onError={() => handleImageError(mainImage)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };
  
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
      <div className="order-2 md:order-1 flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 mt-2 md:mt-0">
        {images.map((image, index) => (
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
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
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
              isZoomed 
                ? { 
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: "scale(1.5)",
                  width: "100%", 
                  height: "100%",
                  objectFit: "cover" 
                }
                : {}
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;

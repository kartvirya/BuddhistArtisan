import { Container } from '../ui/container';
import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah J.",
    location: "United States",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    content: "The Medicine Buddha statue I received is simply beautiful. The detail and expression are remarkable, and I can feel the devotion that went into creating it. It has become the centerpiece of my meditation space."
  },
  {
    id: 2,
    name: "David L.",
    location: "Canada",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    content: "My singing bowl arrived quickly and securely packaged. The sound is pure and resonant - much better quality than others I've tried. The certificate of authenticity and information about the crafting process was a lovely touch."
  },
  {
    id: 3,
    name: "Emma R.",
    location: "Australia",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5,
    content: "I'm extremely pleased with my Green Tara statue. The gold plating is exquisite and the gemstone inlays are beautifully done. The communication from Old Stupa was excellent and they were happy to answer all my questions about the symbolism."
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div className="flex text-[#D4AF37] mb-4">
        {renderStars(testimonial.rating)}
      </div>
      <p className="mb-6 text-gray-700 italic">"{testimonial.content}"</p>
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonials } = useQuery({
    queryKey: ['/api/testimonials'],
    staleTime: Infinity
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const displayTestimonials = testimonials || defaultTestimonials;
  
  // Handle window resize to determine slides per view
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Determine slides per view based on screen size
  const getSlidesPerView = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };
  
  const slidesPerView = getSlidesPerView();
  const maxSlide = Math.max(0, displayTestimonials.length - slidesPerView);
  
  // Handle previous and next slide actions
  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
  };
  
  // Update slide position when current slide changes
  useEffect(() => {
    if (containerRef.current) {
      const slideWidth = 100 / slidesPerView;
      containerRef.current.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }
  }, [currentSlide, slidesPerView]);

  return (
    <section className="py-16 bg-[#FAFAF5]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-2">Customer Testimonials</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="relative" id="testimonial-carousel">
          <div 
            className="flex transition-transform duration-500 overflow-hidden" 
            ref={containerRef}
          >
            {displayTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="px-4 transition-transform duration-500"
                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          
          {displayTestimonials.length > slidesPerView && (
            <>
              <button 
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white text-[#3A3238] hover:text-[#D4AF37] w-10 h-10 rounded-full shadow-md flex items-center justify-center transition duration-300 z-10 -ml-5 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''} hidden md:flex`} 
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <button 
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white text-[#3A3238] hover:text-[#D4AF37] w-10 h-10 rounded-full shadow-md flex items-center justify-center transition duration-300 z-10 -mr-5 ${currentSlide === maxSlide ? 'opacity-50 cursor-not-allowed' : ''} hidden md:flex`} 
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}
          
          {/* Mobile Indicators */}
          <div className="flex justify-center mt-8 md:hidden">
            {Array.from({ length: displayTestimonials.length }).map((_, index) => (
              <div 
                key={index}
                className={`mx-1 h-2 w-2 rounded-full transition-colors ${index === currentSlide ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;

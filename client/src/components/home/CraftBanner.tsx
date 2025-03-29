import { Container } from '../ui/container';
import { Link } from 'wouter';

const CraftBanner = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="bg-[#800000] rounded-lg overflow-hidden">
          <div className="md:flex items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1580715911453-d6d9bd967845?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=800&q=80" 
                alt="Artisan Crafting" 
                className="w-full h-64 md:h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="font-serif text-3xl font-bold mb-4">The Art of Devotion</h2>
              <p className="mb-6">
                Our artisans follow techniques passed down through generations, infusing each piece with spiritual significance and devotion. 
                Every statue represents hours of meticulous craftsmanship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="bg-[#D4AF37] hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition duration-300 inline-block">
                  Watch Crafting Process
                </Link>
                <Link href="/about" className="border-2 border-white hover:bg-white hover:text-[#800000] text-white px-6 py-3 rounded-md font-medium transition duration-300 inline-block">
                  Meet Our Artisans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CraftBanner;

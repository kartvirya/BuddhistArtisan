import { Container } from '@/components/ui/container';

const About = () => {
  return (
    <div className="bg-[#FAFAF5]">
      {/* Hero Section */}
      <div 
        className="h-96 relative flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1555662765-22d392156e69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')` 
        }}
      >
        <div className="text-center text-white px-4 z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Dedicated to preserving traditional Buddhist craftsmanship and supporting local artisans
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4">The Story of Old Stupa</h2>
              <div className="w-20 h-1 bg-[#D4AF37] mb-6"></div>
              <p className="text-gray-700 mb-4">
                Old Stupa began in 2005 in the spiritual heart of Kathmandu, founded by Tenzin Norbu with a vision to preserve and share the rich tradition of Buddhist art and craftsmanship with the world.
              </p>
              <p className="text-gray-700 mb-4">
                After years of studying traditional Buddhist art under master craftsmen in Nepal and Tibet, Tenzin noticed that many skilled artisans were abandoning their craft due to economic pressures and lack of sustainable markets for their work.
              </p>
              <p className="text-gray-700">
                With a deep commitment to preserving these ancient techniques and supporting local communities, Old Stupa was established as a platform to connect these master artisans with appreciative customers worldwide who value authentic, spiritually significant art pieces.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1611516818236-3b1e5a7b1233?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800&q=80" 
                alt="Founder working with artisans" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2">Our Mission & Values</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-sm bg-[#FAFAF5]">
              <div className="w-16 h-16 bg-[#D4AF37] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-[#D4AF37] text-2xl"></i>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Authenticity</h3>
              <p className="text-gray-700">
                We are committed to creating authentic pieces that honor traditional techniques and spiritual significance. Each piece is crafted with devotion and respect for Buddhist traditions.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg shadow-sm bg-[#FAFAF5]">
              <div className="w-16 h-16 bg-[#D4AF37] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hands-helping text-[#D4AF37] text-2xl"></i>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Community Support</h3>
              <p className="text-gray-700">
                We work directly with artisan families and communities, ensuring fair wages and sustainable livelihoods. A portion of our profits supports local monasteries and schools.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg shadow-sm bg-[#FAFAF5]">
              <div className="w-16 h-16 bg-[#D4AF37] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-[#D4AF37] text-2xl"></i>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Sustainability</h3>
              <p className="text-gray-700">
                We use locally sourced, natural materials whenever possible and employ eco-friendly production methods to minimize our environmental impact.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Meet the Artisans */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2">Meet Our Artisans</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our pieces are crafted by skilled artisans who have dedicated their lives to mastering traditional techniques passed down through generations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Artisan 1 */}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80" 
                alt="Pemba Sherpa" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="font-serif font-semibold text-xl mb-2">Pemba Sherpa</h3>
                <p className="text-[#D4AF37] font-medium mb-3">Master Statue Carver</p>
                <p className="text-gray-700">
                  With over 30 years of experience, Pemba specializes in intricate copper and bronze statues, continuing techniques taught by his grandfather.
                </p>
              </div>
            </div>
            
            {/* Artisan 2 */}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1593526411462-6fdb20b0b06c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80" 
                alt="Lhamo Dolkar" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="font-serif font-semibold text-xl mb-2">Lhamo Dolkar</h3>
                <p className="text-[#D4AF37] font-medium mb-3">Thangka Painter</p>
                <p className="text-gray-700">
                  Lhamo creates vibrant thangka paintings using traditional mineral pigments and techniques that have remained unchanged for centuries.
                </p>
              </div>
            </div>
            
            {/* Artisan 3 */}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1548311461-6c3dfa82c445?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80" 
                alt="Karma Rinchen" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="font-serif font-semibold text-xl mb-2">Karma Rinchen</h3>
                <p className="text-[#D4AF37] font-medium mb-3">Singing Bowl Craftsman</p>
                <p className="text-gray-700">
                  Karma crafts singing bowls using the traditional seven-metal alloy, tuning each by hand to produce perfectly resonant healing tones.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-[#800000] text-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2">Our Crafting Process</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-[#D4AF37] z-0"></div>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Material Selection</h3>
              <p className="text-gray-200">
                We source the finest natural materials following traditional requirements for each piece.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-[#D4AF37] z-0"></div>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Hand Crafting</h3>
              <p className="text-gray-200">
                Each piece is patiently handcrafted using techniques passed down through generations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-[#D4AF37] z-0"></div>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Blessing Ceremony</h3>
              <p className="text-gray-200">
                Many of our statues undergo traditional blessing ceremonies at local monasteries.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="font-serif font-semibold text-xl mb-3">Quality Check</h3>
              <p className="text-gray-200">
                We thoroughly inspect each item for quality and authenticity before shipping.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-[#F5F5DC]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-[#D4AF37] mb-3">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-700 italic mb-6">
                "The Buddha statue I received is breathtaking. The craftsmanship is exquisite and I can feel the dedication that went into creating it. It has transformed my meditation space."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/28.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">Jennifer K.</h4>
                  <p className="text-gray-600 text-sm">California, USA</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-[#D4AF37] mb-3">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-700 italic mb-6">
                "I've ordered several pieces from Old Stupa over the years, and the quality has always been outstanding. The certificate of authenticity and information about the artisans makes each purchase special."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/56.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">Michael T.</h4>
                  <p className="text-gray-600 text-sm">London, UK</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-[#D4AF37] mb-3">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="text-gray-700 italic mb-6">
                "The singing bowl I purchased has the most beautiful, pure sound. Knowing that my purchase supports traditional craftspeople makes it even more meaningful. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/62.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">Sophia L.</h4>
                  <p className="text-gray-600 text-sm">Toronto, Canada</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;

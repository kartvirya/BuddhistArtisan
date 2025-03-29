import { Link } from 'wouter';

const Hero = () => {
  return (
    <section 
      className="h-96 md:h-[550px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')` 
      }}
    >
      <div className="text-center text-white px-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Best Handmade Buddhist Statues</h1>
        <p className="text-lg md:text-xl mb-8">Crafted with Love & Devotion</p>
        <Link href="/shop" className="bg-[#D4AF37] hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition duration-300 inline-block">
          Explore Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;

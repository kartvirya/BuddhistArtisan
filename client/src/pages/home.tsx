import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustSignals from '@/components/home/TrustSignals';
import CraftBanner from '@/components/home/CraftBanner';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <TrustSignals />
      <CraftBanner />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </>
  );
};

export default Home;

import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Container } from '../ui/container';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [location] = useLocation();
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-[#800000] text-[#F5F5DC] text-sm py-2">
        <Container className="flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-4">
            <span><i className="fas fa-phone-alt mr-1"></i> +977-1-4123456</span>
            <span><i className="fas fa-envelope mr-1"></i> info@oldstupa.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-[#D4AF37] transition duration-300"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-[#D4AF37] transition duration-300"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-[#D4AF37] transition duration-300"><i className="fab fa-pinterest-p"></i></a>
            <a href="#" className="hover:text-[#D4AF37] transition duration-300"><i className="fab fa-youtube"></i></a>
          </div>
        </Container>
      </div>
      
      {/* Main Navigation */}
      <Container className="py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-[#D4AF37] text-3xl"><i className="fas fa-dharmachakra"></i></span>
            <div>
              <h1 className="font-serif text-xl md:text-2xl font-bold text-[#800000]">Old Stupa</h1>
              <p className="text-xs text-gray-600">Handmade Buddhist Art</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={`font-medium ${location === '/' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'} transition duration-300`}>Home</Link>
            <Link href="/shop" className={`font-medium ${location === '/shop' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'} transition duration-300`}>Shop</Link>
            <Link href="/about" className={`font-medium ${location === '/about' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'} transition duration-300`}>About Us</Link>
            <Link href="/blog" className={`font-medium ${location === '/blog' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'} transition duration-300`}>Blog</Link>
            <Link href="/contact" className={`font-medium ${location === '/contact' ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'} transition duration-300`}>Contact</Link>
          </nav>
          
          {/* Cart and User Icons */}
          <div className="flex items-center space-x-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <button className="text-[#3A3238] hover:text-[#D4AF37] transition duration-300">
                  <i className="fas fa-search text-lg"></i>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                  <button 
                    className="bg-[#800000] text-white p-2 rounded-md hover:bg-[#D4AF37] transition duration-300"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Search
                  </button>
                </div>
              </DialogContent>
            </Dialog>
            
            <a href="#" className="text-[#3A3238] hover:text-[#D4AF37] transition duration-300">
              <i className="fas fa-user text-lg"></i>
            </a>
            
            <Link href="/cart" className="text-[#3A3238] hover:text-[#D4AF37] transition duration-300 relative">
              <i className="fas fa-shopping-cart text-lg"></i>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden text-[#3A3238] hover:text-[#D4AF37] transition duration-300">
                  <i className="fas fa-bars text-xl"></i>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="py-6 space-y-4">
                  <Link href="/" className="block py-2 px-4 hover:bg-[#F5F5DC] rounded transition">Home</Link>
                  <Link href="/shop" className="block py-2 px-4 hover:bg-[#F5F5DC] rounded transition">Shop</Link>
                  <Link href="/about" className="block py-2 px-4 hover:bg-[#F5F5DC] rounded transition">About Us</Link>
                  <Link href="/blog" className="block py-2 px-4 hover:bg-[#F5F5DC] rounded transition">Blog</Link>
                  <Link href="/contact" className="block py-2 px-4 hover:bg-[#F5F5DC] rounded transition">Contact</Link>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2 py-2 px-4">
                      <i className="fas fa-phone-alt"></i>
                      <span>+977-1-4123456</span>
                    </div>
                    <div className="flex items-center space-x-2 py-2 px-4">
                      <i className="fas fa-envelope"></i>
                      <span>info@oldstupa.com</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;

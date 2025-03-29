import { Link } from 'wouter';
import { Container } from '../ui/container';

const Footer = () => {
  return (
    <footer className="bg-[#3A3238] text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-[#D4AF37] text-3xl mr-2"><i className="fas fa-dharmachakra"></i></span>
              <h3 className="font-serif text-xl font-bold">Old Stupa</h3>
            </div>
            <p className="mb-4 text-gray-400">Handcrafted Buddhist statues and artifacts made with devotion by skilled artisans from Nepal.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Home</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Shop</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Return Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#D4AF37] transition duration-300">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#D4AF37]"></i>
                <span className="text-gray-400">Bouddha, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-[#D4AF37]"></i>
                <span className="text-gray-400">+977 9803254486</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-[#D4AF37]"></i>
                <span className="text-gray-400">info@oldstupa.com</span>
              </li>
              <li className="flex items-center">
                <i className="fab fa-whatsapp mr-3 text-[#D4AF37]"></i>
                <span className="text-gray-400">+977 9803254486</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Old Stupa. All rights reserved.</p>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-4">We Accept:</span>
              <div className="flex space-x-3">
                <i className="fab fa-cc-visa text-xl text-gray-400"></i>
                <i className="fab fa-cc-mastercard text-xl text-gray-400"></i>
                <i className="fab fa-cc-amex text-xl text-gray-400"></i>
                <i className="fab fa-cc-paypal text-xl text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

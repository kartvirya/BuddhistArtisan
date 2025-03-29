import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';

const CartSummary = () => {
  const { cartItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal - discount + shipping;
  
  const handleApplyPromo = () => {
    setIsApplyingPromo(true);
    // Simulate API call to validate promo code
    setTimeout(() => {
      // For demo purposes, any promo code will apply a 10% discount
      if (promoCode.trim() !== '') {
        setDiscount(subtotal * 0.1);
      } else {
        setDiscount(0);
      }
      setIsApplyingPromo(false);
    }, 500);
  };

  return (
    <div className="bg-[#FAFAF5] p-6 rounded-lg">
      <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">Including taxes</p>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Promo Code</label>
        <div className="flex">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow rounded-r-none"
          />
          <Button 
            onClick={handleApplyPromo} 
            className="rounded-l-none bg-[#800000] hover:bg-[#D4AF37]"
            disabled={isApplyingPromo}
          >
            {isApplyingPromo ? 'Applying...' : 'Apply'}
          </Button>
        </div>
      </div>
      
      <Link href="/checkout">
        <Button 
          className="w-full bg-[#D4AF37] hover:bg-opacity-90 text-white py-3 rounded-md font-medium transition duration-300"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </Link>
      
      <div className="mt-6">
        <h3 className="font-serif font-semibold mb-2">We Accept</h3>
        <div className="flex space-x-3">
          <i className="fab fa-cc-visa text-xl text-gray-600"></i>
          <i className="fab fa-cc-mastercard text-xl text-gray-600"></i>
          <i className="fab fa-cc-amex text-xl text-gray-600"></i>
          <i className="fab fa-cc-paypal text-xl text-gray-600"></i>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

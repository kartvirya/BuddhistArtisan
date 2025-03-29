import { Container } from '@/components/ui/container';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="py-12 bg-[#FAFAF5]">
      <Container>
        <h1 className="font-serif text-3xl font-bold mb-6">Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <h2 className="font-serif font-semibold text-lg">Cart Items ({cartItems.length})</h2>
                  <Button 
                    variant="ghost" 
                    className="text-red-500 text-sm hover:text-red-700"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div>
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Link href="/shop">
                    <Button variant="outline" className="flex items-center">
                      <i className="fas fa-chevron-left mr-2"></i> Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg">
            <div className="mb-6">
              <i className="fas fa-shopping-cart text-6xl text-gray-300"></i>
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/shop">
              <Button className="bg-[#800000] hover:bg-[#D4AF37] text-white px-6 py-3 rounded-md font-medium transition duration-300">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;

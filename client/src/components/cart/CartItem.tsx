import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      <div className="sm:w-1/4 mb-4 sm:mb-0">
        <div className="aspect-square w-full max-w-[120px] relative">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      
      <div className="sm:w-3/4 flex flex-col sm:flex-row">
        <div className="flex-grow mb-4 sm:mb-0 sm:pr-4">
          <h3 className="font-serif font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-600 mt-1">{formatPrice(item.price)}</p>
        </div>
        
        <div className="flex flex-row sm:flex-col justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 border"
              onClick={decrementQuantity}
            >
              <i className="fas fa-minus text-xs"></i>
            </Button>
            
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="w-12 h-8 mx-1 text-center"
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0 border"
              onClick={incrementQuantity}
            >
              <i className="fas fa-plus text-xs"></i>
            </Button>
          </div>
          
          <div className="flex items-center mt-0 sm:mt-4">
            <span className="font-medium mr-4 sm:mr-0 sm:mb-2">{formatPrice(subtotal)}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
              onClick={() => removeFromCart(item.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Stripe setup
// Provide a fallback mechanism when Stripe key is not available
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';
const stripePromise = STRIPE_PUBLIC_KEY ? 
  loadStripe(STRIPE_PUBLIC_KEY) : 
  Promise.resolve(null);

// Form schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(7, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State/Province is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Payment Form Component
const PaymentForm = ({ clientSecret, shippingDetails }: { clientSecret: string, shippingDetails: CheckoutFormValues }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/thank-you',
          payment_method_data: {
            billing_details: {
              name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
              email: shippingDetails.email,
              phone: shippingDetails.phone,
              address: {
                line1: shippingDetails.address,
                city: shippingDetails.city,
                state: shippingDetails.state,
                postal_code: shippingDetails.postalCode,
                country: shippingDetails.country,
              }
            }
          }
        },
        redirect: 'if_required'
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "There was an issue processing your payment.",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
        clearCart();
        setLocation('/');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md">
        <PaymentElement />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#800000] hover:bg-[#D4AF37] py-3"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <i className="fas fa-spinner fa-spin mr-2"></i> Processing Payment...
          </span>
        ) : (
          "Complete Order"
        )}
      </Button>
    </form>
  );
};

// Main Checkout Component
const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const [shippingDetails, setShippingDetails] = useState<CheckoutFormValues | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      notes: "",
    },
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
      });
      setLocation('/shop');
    }
  }, [cartItems, setLocation, toast]);

  const onSubmitShippingDetails = async (data: CheckoutFormValues) => {
    setShippingDetails(data);
    
    try {
      // Create a payment intent
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: cartTotal,
        items: cartItems,
        customer: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        }
      });
      
      const responseData = await response.json();
      const { clientSecret, isDevelopment } = responseData;
      
      setClientSecret(clientSecret);
      setStep(2);
      
      // Show warning if in development mode (missing Stripe API keys)
      if (isDevelopment) {
        toast({
          title: "Development Mode",
          description: "Running in demo mode because Stripe is not fully configured. Order processing will be simulated.",
          duration: 10000, // longer duration to ensure user sees it
        });
      }
      
      // Scroll to top for payment step
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast({
        title: "Checkout Error",
        description: "There was a problem setting up the payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-12 bg-[#FAFAF5]">
      <Container>
        <h1 className="font-serif text-3xl font-bold mb-6">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#800000]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-[#800000] text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className={`flex-grow mx-4 mt-4 border-t ${step >= 2 ? 'border-[#800000]' : 'border-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#800000]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-[#800000] text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              {step === 1 && (
                <>
                  <h2 className="font-serif text-xl font-semibold mb-4">Shipping Information</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitShippingDetails)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, Apt 4B" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="United States" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Special instructions for delivery or packaging" 
                                className="resize-none" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full bg-[#800000] hover:bg-[#D4AF37]"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}

              {step === 2 && shippingDetails && clientSecret && (
                <>
                  <h2 className="font-serif text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div className="mb-6">
                    <Button 
                      variant="ghost" 
                      className="text-sm flex items-center"
                      onClick={() => setStep(1)}
                    >
                      <i className="fas fa-arrow-left mr-2"></i> Back to Shipping
                    </Button>

                    <div className="mt-4 p-4 bg-[#FAFAF5] rounded-md">
                      <h3 className="font-medium mb-2">Shipping to:</h3>
                      <p>
                        {shippingDetails.firstName} {shippingDetails.lastName}<br />
                        {shippingDetails.address}<br />
                        {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}<br />
                        {shippingDetails.country}<br />
                        {shippingDetails.email}<br />
                        {shippingDetails.phone}
                      </p>
                    </div>
                  </div>
                  
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm clientSecret={clientSecret} shippingDetails={shippingDetails} />
                  </Elements>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-serif font-semibold mb-2">We Accept</h3>
                <div className="flex space-x-3">
                  <i className="fab fa-cc-visa text-xl text-gray-600"></i>
                  <i className="fab fa-cc-mastercard text-xl text-gray-600"></i>
                  <i className="fab fa-cc-amex text-xl text-gray-600"></i>
                  <i className="fab fa-cc-paypal text-xl text-gray-600"></i>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#F5F5DC] rounded-md text-sm">
                <p className="flex items-start">
                  <i className="fas fa-shield-alt text-[#D4AF37] mt-1 mr-2"></i>
                  Your payment information is encrypted and secure. We never store your full credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;

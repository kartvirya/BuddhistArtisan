import { Container } from '../ui/container';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: SubscribeFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/newsletter/subscribe', data);
      toast({
        title: "Thank you for subscribing!",
        description: "You've been added to our newsletter list.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#800000] text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8">
            Subscribe to receive updates on new products, special offers, and articles about Buddhist art and culture.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input 
                        placeholder="Your email address" 
                        className="px-4 py-3 rounded-md focus:outline-none text-[#3A3238] w-full" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-left text-xs mt-1" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="bg-[#D4AF37] hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </Form>
          
          <p className="mt-4 text-sm opacity-80">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;

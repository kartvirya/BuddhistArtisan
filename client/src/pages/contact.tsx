import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(7, { message: "Please enter a valid phone number" }).optional(),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us! We'll respond shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAFAF5]">
      {/* Hero Section */}
      <div 
        className="h-64 relative flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1489659639091-8b687bc4386e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')` 
        }}
      >
        <div className="text-center text-white px-4 z-10">
          <h1 className="font-serif text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We're here to answer any questions you might have about our products or services
          </p>
        </div>
      </div>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="font-serif text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#F5F5DC] rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-map-marker-alt text-[#800000]"></i>
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Our Location</h3>
                      <p className="text-gray-600">Bouddha, Kathmandu, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#F5F5DC] rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-phone-alt text-[#800000]"></i>
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Phone Number</h3>
                      <p className="text-gray-600">+977 9803254486</p>
                      <p className="text-gray-600">+977 9803254486 (WhatsApp)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#F5F5DC] rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-envelope text-[#800000]"></i>
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Email Address</h3>
                      <p className="text-gray-600">info@oldstupa.com</p>
                      <p className="text-gray-600">support@oldstupa.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#F5F5DC] rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-clock text-[#800000]"></i>
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Working Hours</h3>
                      <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="font-serif text-2xl font-bold mb-6">Follow Us</h2>
                <div className="flex space-x-4">
                  <a href="#" className="bg-[#F5F5DC] w-12 h-12 rounded-full flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition duration-300">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="bg-[#F5F5DC] w-12 h-12 rounded-full flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="bg-[#F5F5DC] w-12 h-12 rounded-full flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition duration-300">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                  <a href="#" className="bg-[#F5F5DC] w-12 h-12 rounded-full flex items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition duration-300">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Inquiry about products" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please type your message here..." 
                              className="min-h-[150px] resize-none" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-[#800000] hover:bg-[#D4AF37] text-white px-8 py-3 rounded-md font-medium transition duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Map Section */}
      <section className="py-8">
        <Container>
          <div className="rounded-lg overflow-hidden shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2080250846447!2d85.3590275765276!3d27.71923802539204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1bda4a951f0f%3A0x3ddabb234891c3bd!2sBoudhanath%20Stupa!5e0!3m2!1sen!2sus!4v1684829301404!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Old Stupa Location"
            ></iframe>
          </div>
        </Container>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Find answers to our most commonly asked questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#FAFAF5] p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-lg mb-3">How are your products shipped?</h3>
              <p className="text-gray-700">
                All items are carefully packaged to ensure safe delivery. We ship worldwide using express courier services with tracking. Larger statues are shipped in custom wooden crates for extra protection.
              </p>
            </div>
            
            <div className="bg-[#FAFAF5] p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-lg mb-3">What is your return policy?</h3>
              <p className="text-gray-700">
                We accept returns within 14 days of delivery for items in their original condition. Custom orders cannot be returned unless damaged during shipping. Please contact us for return authorization.
              </p>
            </div>
            
            <div className="bg-[#FAFAF5] p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-lg mb-3">Are your statues blessed?</h3>
              <p className="text-gray-700">
                Many of our statues undergo traditional blessing ceremonies at local monasteries. If this is important to you, please mention it in your order notes, and we can provide details about the blessing process.
              </p>
            </div>
            
            <div className="bg-[#FAFAF5] p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-lg mb-3">Can I request custom sizes or designs?</h3>
              <p className="text-gray-700">
                Yes, we welcome custom orders. Please contact us with your requirements, and we'll work with our artisans to create a piece that meets your specifications. Custom orders typically take 2-3 months to complete.
              </p>
            </div>
            
            <div className="bg-[#FAFAF5] p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-lg mb-3">How do I care for my Buddhist statue?</h3>
              <p className="text-gray-700">
                We include care instructions with each purchase. Generally, avoid direct sunlight and excessive humidity. Brass and copper items can be gently polished with a soft cloth. For specific care questions, please contact us.
              </p>
            </div>
            
            <div className="bg-[#FAFAF5] p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-semibold text-lg mb-3">Do you offer wholesale pricing?</h3>
              <p className="text-gray-700">
                Yes, we offer wholesale pricing for qualified retailers and meditation centers. Please contact us with information about your business, and we'll provide our wholesale catalog and pricing.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-700 mb-4">
              Can't find the answer you're looking for? Contact our customer support team.
            </p>
            <Button className="bg-[#800000] hover:bg-[#D4AF37] text-white">
              Contact Support
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;

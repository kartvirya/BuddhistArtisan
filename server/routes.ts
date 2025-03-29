import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";

// Check if Stripe API key is available
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not found, payment functionality will not work properly');
}

// Set up Stripe only if the API key is available
const stripe = process.env.STRIPE_SECRET_KEY ? 
  new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" }) : 
  undefined;

// Create a health check route for Vercel
export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for Vercel
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/products/related/:slug", async (req, res) => {
    try {
      const relatedProducts = await storage.getRelatedProducts(req.params.slug);
      res.json(relatedProducts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Categories API
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Blog API
  app.get("/api/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/blog/recent", async (req, res) => {
    try {
      const recentPosts = await storage.getRecentBlogPosts();
      res.json(recentPosts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Newsletter Subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      const subscriber = await storage.addSubscriber({ email });
      res.status(201).json({ message: "Subscription successful", subscriber });
    } catch (error: any) {
      if (error.message.includes("unique")) {
        return res.status(400).json({ message: "This email is already subscribed" });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email and message are required" });
      }
      
      const contactMessage = await storage.addContactMessage({ 
        name, 
        email, 
        phone: phone || "", 
        message 
      });
      
      res.status(201).json({ message: "Message sent successfully", contactMessage });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe payment integration
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, items, customer } = req.body;
      
      // Create a new order in our database
      const order = await storage.createOrder({
        customerId: null, // Guest checkout
        customerName: customer?.name || "Guest",
        customerEmail: customer?.email || "guest@example.com",
        customerPhone: customer?.phone || "",
        status: "pending",
        total: amount,
        shippingAddress: customer || {},
        paymentIntentId: "",
      });
      
      // Create items for the order
      if (items && items.length > 0) {
        for (const item of items) {
          await storage.createOrderItem({
            orderId: order.id,
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          });
        }
      }
      
      // Check if Stripe is available
      if (!stripe) {
        console.warn("Stripe is not configured. Using mock payment intent for development.");
        // For development only - return a mock client secret
        // In production, this should be properly set up with actual Stripe integration
        const mockClientSecret = `dev_pi_${Math.random().toString(36).substring(2, 15)}`;
        
        // Update the order with a placeholder payment intent ID
        await storage.updateOrderPaymentIntent(order.id, `dev_${Date.now()}`);
        
        return res.json({ 
          clientSecret: mockClientSecret,
          isDevelopment: true
        });
      }
      
      // If Stripe is properly configured, create a real payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          orderId: order.id.toString(),
        },
        receipt_email: customer?.email,
      });
      
      // Update the order with the payment intent ID
      await storage.updateOrderPaymentIntent(order.id, paymentIntent.id);
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error processing payment intent:", error);
      res.status(500).json({ message: "Error processing payment: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

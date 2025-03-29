import { 
  users, type User, type InsertUser, 
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  blogPosts, type BlogPost, type InsertBlogPost,
  testimonials, type Testimonial, type InsertTestimonial,
  subscribers, type Subscriber, type InsertSubscriber,
  contactMessages, type ContactMessage, type InsertContactMessage,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getRelatedProducts(slug: string): Promise<Product[]>;

  // Categories
  getAllCategories(): Promise<Category[]>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getRecentBlogPosts(limit?: number): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;

  // Newsletter Subscribers
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;

  // Contact Messages
  addContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: number): Promise<Order | undefined>;
  updateOrderPaymentIntent(id: number, paymentIntentId: string): Promise<Order>;
  
  // Order Items
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private blogPosts: Map<number, BlogPost>;
  private testimonials: Map<number, Testimonial>;
  private subscribers: Map<number, Subscriber>;
  private contactMessages: Map<number, ContactMessage>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  userCurrentId: number;
  productCurrentId: number;
  categoryCurrentId: number;
  blogPostCurrentId: number;
  testimonialCurrentId: number;
  subscriberCurrentId: number;
  contactMessageCurrentId: number;
  orderCurrentId: number;
  orderItemCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.subscribers = new Map();
    this.contactMessages = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.categoryCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.subscriberCurrentId = 1;
    this.contactMessageCurrentId = 1;
    this.orderCurrentId = 1;
    this.orderItemCurrentId = 1;
    
    this.initializeData();
  }

  // Initialize some sample data
  private initializeData() {
    // Initialize categories
    const defaultCategories: InsertCategory[] = [
      { name: "Buddhas", slug: "buddhas", icon: "fas fa-om", description: "Hand-crafted Buddha statues in various poses and materials" },
      { name: "Bodhisattvas", slug: "bodhisattvas", icon: "fas fa-praying-hands", description: "Statues of enlightened beings who have delayed nirvana to help others" },
      { name: "Gurus", slug: "gurus", icon: "fas fa-user-alt", description: "Representations of spiritual teachers and masters" },
      { name: "Protectors", slug: "protectors", icon: "fas fa-shield-alt", description: "Protective deities and guardians of Buddhist teachings" },
      { name: "Singing Bowls", slug: "singing-bowls", icon: "fas fa-bell", description: "Traditional meditation and healing instruments" },
      { name: "Custom Orders", slug: "custom-orders", icon: "fas fa-magic", description: "Personalized Buddhist art made to your specifications" }
    ];
    
    defaultCategories.forEach(category => {
      this.createCategory(category);
    });
    
    // Initialize products
    const defaultProducts: InsertProduct[] = [
      {
        name: "Medicine Buddha",
        slug: "medicine-buddha",
        description: "Hand-carved copper statue with turquoise inlay. The Medicine Buddha represents the healing aspect of the Buddha nature and is believed to help overcome physical and mental illness.",
        price: 289,
        discountedPrice: null,
        sku: "MB-001",
        category: "buddhas",
        images: ["https://images.unsplash.com/photo-1566873535350-a3f5d4a6e43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1610037944410-3a03697ec8e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
        material: "Copper with turquoise",
        dimensions: "Height: 20cm, Width: 15cm, Depth: 12cm",
        weight: "1.5kg",
        inStock: true,
        isFeatured: true,
        isNew: true,
        isBestSeller: false
      },
      {
        name: "Tibetan Singing Bowl",
        slug: "tibetan-singing-bowl",
        description: "Seven-metal singing bowl with wooden striker. Each bowl is hand-hammered with traditional techniques and tuned to a perfect pitch.",
        price: 119,
        discountedPrice: null,
        sku: "SB-001",
        category: "singing-bowls",
        images: ["https://images.unsplash.com/photo-1580502088924-fbd827d8b736?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1593248514630-6feb79a9d7d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
        material: "Seven-metal alloy",
        dimensions: "Diameter: 12cm, Height: 6cm",
        weight: "0.8kg",
        inStock: true,
        isFeatured: true,
        isNew: false,
        isBestSeller: true
      },
      {
        name: "Green Tara",
        slug: "green-tara",
        description: "Fully gold-plated brass statue with gemstone inlays. Green Tara represents active compassion and protection from fear and dangers.",
        price: 349,
        discountedPrice: null,
        sku: "GT-001",
        category: "bodhisattvas",
        images: ["https://images.unsplash.com/photo-1558626056-c993f101d505?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1585848705532-c999dcd95557?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
        material: "Brass with gold plating",
        dimensions: "Height: 25cm, Width: 18cm, Depth: 15cm",
        weight: "2.2kg",
        inStock: true,
        isFeatured: true,
        isNew: false,
        isBestSeller: false
      },
      {
        name: "Prayer Wheel",
        slug: "prayer-wheel",
        description: "Hand-carved wooden prayer wheel with embedded mantras. Each rotation of the wheel is said to have the same spiritual benefit as reciting the mantras it contains.",
        price: 89,
        discountedPrice: null,
        sku: "PW-001",
        category: "custom-orders",
        images: ["https://images.unsplash.com/photo-1557173823-d6f38e36fae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1550722617-2e52cc9ec18e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
        material: "Wood with brass details",
        dimensions: "Height: 30cm, Width: 10cm",
        weight: "0.6kg",
        inStock: true,
        isFeatured: true,
        isNew: true,
        isBestSeller: false
      },
      {
        name: "Avalokiteshvara",
        slug: "avalokiteshvara",
        description: "Four-armed compassion deity statue. Avalokiteshvara embodies the compassion of all Buddhas and is one of the most widely revered bodhisattvas.",
        price: 399,
        discountedPrice: 349,
        sku: "AV-001",
        category: "bodhisattvas",
        images: ["https://images.unsplash.com/photo-1599639668273-a295bcfd16ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1577729571322-0acbfff3e68b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
        material: "Bronze",
        dimensions: "Height: 30cm, Width: 22cm, Depth: 18cm",
        weight: "3.0kg",
        inStock: true,
        isFeatured: false,
        isNew: false,
        isBestSeller: false
      },
      {
        name: "Mahakala Mask",
        slug: "mahakala-mask",
        description: "Traditional handcrafted protective deity mask. Mahakala is a wrathful deity and protector of the dharma in Tibetan Buddhism.",
        price: 199,
        discountedPrice: null,
        sku: "MM-001",
        category: "protectors",
        images: ["https://images.unsplash.com/photo-1566743136192-817d040b8bf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80", "https://images.unsplash.com/photo-1509024644558-2f56ce76c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"],
        material: "Wood with acrylic paint",
        dimensions: "Height: 40cm, Width: 30cm, Depth: 15cm",
        weight: "1.2kg",
        inStock: true,
        isFeatured: false,
        isNew: false,
        isBestSeller: false
      }
    ];
    
    defaultProducts.forEach(product => {
      this.createProduct(product);
    });
    
    // Initialize blog posts
    const defaultBlogPosts: InsertBlogPost[] = [
      {
        title: "The Symbolism of Buddha Statues",
        slug: "symbolism-buddha-statues",
        content: "Buddha statues are more than decorative pieces; they carry deep symbolism in Buddhist tradition. The different hand gestures (mudras) represent various aspects of the Buddha's teachings. For example, the earth-touching right hand represents the moment of enlightenment, while hands placed in the lap signify meditation. The elongated earlobes remind us of the Buddha's royal past and his rejection of material wealth. The serene smile and half-closed eyes demonstrate the perfect balance between meditation and engagement with the world...",
        excerpt: "Understanding the meaning behind different Buddha poses and what they represent in Buddhist tradition.",
        coverImage: "https://images.unsplash.com/photo-1530254843304-219aac509830?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        author: "Tenzin Norbu",
        published: true,
        createdAt: new Date("2023-05-15")
      },
      {
        title: "The Healing Sound of Singing Bowls",
        slug: "healing-sound-singing-bowls",
        content: "Tibetan singing bowls have been used for centuries for meditation and healing. When played, these bowls create a range of harmonics that are believed to entrain brainwaves into more relaxed states. Traditional bowls are made from a seven-metal alloy representing gold, silver, mercury, copper, iron, tin, and lead, though the exact proportions remain a closely guarded secret among master craftsmen. Each metal is associated with a celestial body and particular energy. Modern research has begun to validate the therapeutic effects of these instruments on stress reduction, pain management, and even cellular regeneration...",
        excerpt: "How singing bowls can enhance meditation practice and promote healing through sound vibrations.",
        coverImage: "https://images.unsplash.com/photo-1519922545699-fee10aaa0a3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        author: "Karma Rinchen",
        published: true,
        createdAt: new Date("2023-04-28")
      },
      {
        title: "Meet the Master Craftsmen",
        slug: "meet-master-craftsmen",
        content: "Behind each Old Stupa piece is a master craftsman with decades of experience and devotion to their art. Many of our artisans began training in childhood through the traditional master-apprentice system. Take Pemba Sherpa, for example, who has been creating bronze Buddha statues for over 35 years. He learned the lost-wax casting technique from his father and has refined it to create statues of exceptional detail and spiritual presence. Or Lhamo Dolkar, a thangka painter who creates her own mineral-based pigments using techniques passed down through 15 generations in her family. These craftspeople don't just create objects; they participate in a living tradition that connects them to centuries of Buddhist artistic expression...",
        excerpt: "The stories of our artisans who have dedicated their lives to preserving traditional Buddhist crafts.",
        coverImage: "https://images.unsplash.com/photo-1570289470121-c1b5b36631a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        author: "Dorje Lama",
        published: true,
        createdAt: new Date("2023-04-10")
      }
    ];
    
    defaultBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });
    
    // Initialize testimonials
    const defaultTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah J.",
        location: "United States",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        rating: 5,
        content: "The Medicine Buddha statue I received is simply beautiful. The detail and expression are remarkable, and I can feel the devotion that went into creating it. It has become the centerpiece of my meditation space.",
        published: true
      },
      {
        name: "David L.",
        location: "Canada",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        content: "My singing bowl arrived quickly and securely packaged. The sound is pure and resonant - much better quality than others I've tried. The certificate of authenticity and information about the crafting process was a lovely touch.",
        published: true
      },
      {
        name: "Emma R.",
        location: "Australia",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4,
        content: "I'm extremely pleased with my Green Tara statue. The gold plating is exquisite and the gemstone inlays are beautifully done. The communication from Old Stupa was excellent and they were happy to answer all my questions about the symbolism.",
        published: true
      }
    ];
    
    defaultTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product Methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }

  async getRelatedProducts(slug: string): Promise<Product[]> {
    const product = await this.getProductBySlug(slug);
    if (!product) return [];
    
    return Array.from(this.products.values())
      .filter(p => p.slug !== slug && p.category === product.category)
      .slice(0, 4);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  // Category Methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Blog Post Methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug && post.published,
    );
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id,
      createdAt: insertBlogPost.createdAt || new Date() 
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Testimonial Methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => testimonial.published);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Subscriber Methods
  async addSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.subscribers.values()).find(
      sub => sub.email === insertSubscriber.email
    );
    
    if (existingSubscriber) {
      throw new Error("Email already exists in subscriber list (unique constraint)");
    }
    
    const id = this.subscriberCurrentId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      createdAt: new Date() 
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  // Contact Message Methods
  async addContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // Order Methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderPaymentIntent(id: number, paymentIntentId: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error(`Order with ID ${id} not found`);
    
    order.paymentIntentId = paymentIntentId;
    this.orders.set(id, order);
    return order;
  }

  // Order Item Methods
  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemCurrentId++;
    const item: OrderItem = { ...insertItem, id };
    this.orderItems.set(id, item);
    return item;
  }

  async getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId);
  }
}

export const storage = new MemStorage();

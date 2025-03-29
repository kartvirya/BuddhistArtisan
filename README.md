# Old Stupa - Buddhist Handicraft E-commerce Website

A comprehensive e-commerce website for Buddhist handicrafts, statues, and spiritual art. Built with modern web technologies and designed for an intuitive shopping experience.

## Features

- Browse products by categories (Buddhas, Bodhisattvas, etc.)
- Product detail pages with galleries
- Shopping cart functionality
- Checkout with Stripe payment integration
- Blog section with religious/cultural articles
- Responsive design for all devices

## Technologies Used

- Frontend: React, TailwindCSS, ShadcnUI
- Backend: Express.js, Node.js
- State Management: React Context API, TanStack Query
- Payment Processing: Stripe
- Deployment: Vercel

## Deployment Instructions

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set up the following environment variables in Vercel:
   - `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_`)
   - `VITE_STRIPE_PUBLIC_KEY` - Your Stripe publishable key (starts with `pk_`)

3. Deploy your application

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
   ```
4. Run the development server: `npm run dev`
5. Open `http://localhost:5000` in your browser

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared types and schemas
- `/api` - Vercel serverless API functions

## Contact

For inquiries about handcrafted Buddhist statues and art:
- Phone: +977 9803254486
- Email: info@oldstupa.com
- Address: Thamel, Kathmandu, Nepal